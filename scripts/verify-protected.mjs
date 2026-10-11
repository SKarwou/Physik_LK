import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import * as React from 'react';
import * as jsxRuntime from 'react/jsx-runtime';
import katex from 'katex';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';
import { protectedCourses } from './protected-courses.mjs';
import { projectRoot, encryptionIterations } from './protected-build.mjs';

const encode = text => new TextEncoder().encode(text);
const decode = value => Buffer.from(value, 'base64');
const outDir = path.join(projectRoot, 'docs');
globalThis.__PHYSIK_SHARED__ = { React, jsxRuntime, katex };

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? walk(path.join(directory, entry.name)) : path.join(directory, entry.name)))).flat();
}
function stringLiterals(js) {
  const values = new Set();
  const ast = ts.createSourceFile('built.js', js, ts.ScriptTarget.ESNext, true, ts.ScriptKind.JS);
  function visit(node) {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) values.add(node.text);
    ts.forEachChild(node, visit);
  }
  visit(ast);
  return values;
}
async function decrypt(envelope, password) {
  const material = await crypto.subtle.importKey('raw', encode(password), 'PBKDF2', false, ['deriveKey']);
  const key = await crypto.subtle.deriveKey({ name: 'PBKDF2', hash: 'SHA-256', iterations: envelope.iterations, salt: decode(envelope.salt) }, material, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
  const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: decode(envelope.iv), additionalData: encode(`physik-lk:${envelope.slug}:v1`), tagLength: 128 }, key, decode(envelope.ciphertext));
  return JSON.parse(new TextDecoder().decode(plain));
}

const files = await walk(outDir);
assert(!files.some(file => file.endsWith('.map')), 'Source maps must not be deployed');
const protectedFiles = files.filter(file => file.startsWith(path.join(outDir, 'protected') + path.sep));
assert.deepEqual(protectedFiles.map(file => path.basename(file)).sort(), protectedCourses.map(course => `${course.slug}.json`).sort());
const publicSources = await Promise.all(files.filter(file => /\.(?:js|css|html|json)$/.test(file) && !protectedFiles.includes(file)).map(file => readFile(file, 'utf8')));
const publicText = publicSources.join('\n');
const publicScripts = await Promise.all(files.filter(file => file.endsWith('.js') && !protectedFiles.includes(file)).map(file => readFile(file, 'utf8')));
const publicLiterals = new Set(publicScripts.flatMap(source => [...stringLiterals(source)]));
for (const course of protectedCourses) assert(!publicText.includes(course.password), 'A password is present in public files');

const iqbSource = await readFile(path.join(projectRoot, 'src/learning/iqbPractice.ts'), 'utf8');
const { outputText } = ts.transpileModule(iqbSource, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } });
const { iqbPractice } = await import('data:text/javascript;base64,' + Buffer.from(outputText).toString('base64'));
const seenSalts = new Set(), seenIvs = new Set();
for (const course of protectedCourses) {
  const envelope = JSON.parse(await readFile(path.join(outDir, 'protected', `${course.slug}.json`), 'utf8'));
  assert.equal(envelope.slug, course.slug);
  assert.equal(envelope.version, 1);
  assert.equal(envelope.cipher, 'AES-GCM');
  assert.equal(envelope.kdf, 'PBKDF2');
  assert.equal(envelope.hash, 'SHA-256');
  assert.equal(envelope.iterations, encryptionIterations);
  assert.equal(decode(envelope.salt).length, 16);
  assert.equal(decode(envelope.iv).length, 12);
  assert(!seenSalts.has(envelope.salt) && !seenIvs.has(envelope.iv), 'Fresh salts and IVs are required');
  seenSalts.add(envelope.salt); seenIvs.add(envelope.iv);
  const payload = await decrypt(envelope, course.password);
  assert.equal(payload.slug, course.slug);
  assert.equal(payload.version, 1);
  assert(payload.css.length > 0 && payload.js.length > 0);
  const module = await import('data:text/javascript;base64,' + Buffer.from(payload.js).toString('base64'));
  assert.equal(typeof module.default, 'function');
  assert(renderToStaticMarkup(React.createElement(module.default)).includes('Kapitel'));
  await assert.rejects(decrypt(envelope, 'not-the-course-password'));
  const corrupted = decode(envelope.ciphertext); corrupted[0] ^= 1;
  await assert.rejects(decrypt({ ...envelope, ciphertext: corrupted.toString('base64') }, course.password));
  await assert.rejects(decrypt({ ...envelope, slug: 'different-course' }, course.password));
  const moduleLiterals = stringLiterals(payload.js);
  for (const task of Object.values(iqbPractice[course.slug])) assert(moduleLiterals.has(task.calculate), `Own IQB task missing from ${course.slug}`);
  for (const other of protectedCourses) {
    for (const task of Object.values(iqbPractice[other.slug])) {
      assert(!publicLiterals.has(task.calculate), `Protected IQB task leaked to public app: ${other.slug}`);
      if (other.slug !== course.slug) assert(!moduleLiterals.has(task.calculate), `IQB task leaked across course boundary: ${other.slug} -> ${course.slug}`);
    }
  }
  console.log(`${course.slug}: decryption, React bridge, wrong password, tampering, course binding and IQB isolation passed`);
}
console.log('Protected production artifact checks passed.');
