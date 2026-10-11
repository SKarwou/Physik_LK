import * as React from 'react';
import * as jsxRuntime from 'react/jsx-runtime';
import katex from 'katex';
import type { ProtectedSlug } from './courses';

type Envelope = { version: number; slug: string; cipher: string; kdf: string; hash: string; iterations: number; salt: string; iv: string; ciphertext: string };
type CoursePayload = { version: number; slug: string; js: string; css: string };
export type UnlockedCourse = { Component: React.ComponentType; release: () => void };
declare global {
  var __PHYSIK_SHARED__: { React: typeof React; jsxRuntime: typeof jsxRuntime; katex: typeof katex };
}

function bytes(value: string): Uint8Array<ArrayBuffer> {
  return Uint8Array.from(atob(value), character => character.charCodeAt(0));
}

export async function unlockCourse(slug: ProtectedSlug, password: string, signal?: AbortSignal): Promise<UnlockedCourse> {
  if (!globalThis.crypto?.subtle) throw new Error('Bitte öffne die Website über HTTPS in einem aktuellen Browser.');
  const response = await fetch(`${import.meta.env.BASE_URL}protected/${slug}.json`, { signal, cache: 'no-cache' });
  if (!response.ok) throw new Error('Der Lernbereich konnte nicht geladen werden. Bitte versuche es erneut.');
  let data: Envelope;
  try { data = await response.json(); }
  catch { throw new Error('Die Kapiteldatei ist noch nicht verfügbar. Bitte lade die Seite neu.'); }
  if (data.version !== 1 || data.slug !== slug || data.cipher !== 'AES-GCM' || data.kdf !== 'PBKDF2' || data.hash !== 'SHA-256' || data.iterations !== 310000) {
    throw new Error('Die Kapiteldatei konnte nicht gelesen werden. Bitte lade die Seite neu.');
  }
  const encoder = new TextEncoder();
  const material = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveKey']);
  const key = await crypto.subtle.deriveKey({ name: 'PBKDF2', hash: 'SHA-256', salt: bytes(data.salt), iterations: data.iterations }, material, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
  let plain: ArrayBuffer;
  try {
    plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: bytes(data.iv), additionalData: encoder.encode(`physik-lk:${slug}:v1`), tagLength: 128 }, key, bytes(data.ciphertext));
  } catch {
    throw new Error('Das Passwort passt nicht zu diesem Thema. Prüfe Groß- und Kleinschreibung sowie Unterstriche.');
  }
  const payload: CoursePayload = JSON.parse(new TextDecoder().decode(plain));
  if (payload.version !== 1 || payload.slug !== slug || typeof payload.js !== 'string' || typeof payload.css !== 'string') throw new Error('Die Kapiteldatei konnte nicht geöffnet werden.');
  signal?.throwIfAborted();
  globalThis.__PHYSIK_SHARED__ = { React, jsxRuntime, katex };
  const url = URL.createObjectURL(new Blob([payload.js], { type: 'text/javascript' }));
  const style = document.createElement('style');
  style.dataset.course = slug;
  style.textContent = payload.css;
  const release = () => { style.remove(); URL.revokeObjectURL(url); };
  try {
    const module = await import(/* @vite-ignore */ url);
    signal?.throwIfAborted();
    if (typeof module.default !== 'function') throw new Error('Das Kapitelmodul ist ungültig.');
    // Keep the existing global learning theme after each course's component CSS.
    document.head.insertBefore(style, document.head.querySelector('link[rel="stylesheet"], style'));
    return { Component: module.default, release };
  } catch (error) {
    release();
    if (signal?.aborted) throw error;
    throw new Error('Das Kapitel konnte nicht gestartet werden. Bitte lade die Seite neu und versuche es erneut.');
  }
}
