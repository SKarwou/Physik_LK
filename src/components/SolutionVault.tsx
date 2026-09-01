import { useState } from "react";
import type { Exercise } from "../chapters";
import { encryptedSolutions } from "../encryptedSolutions";

type Solution = { id: string; title: string; solution: string; checkpoints?: string[] };

function decodeBase64(value: string) {
  const binary = atob(value);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function decrypt(slug: string, password: string): Promise<Solution[]> {
  const payload = encryptedSolutions[slug];
  if (!payload) throw new Error("Für dieses Kapitel liegt keine Freigabe vor.");
  const material = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveKey"]);
  const key = await crypto.subtle.deriveKey({ name: "PBKDF2", hash: "SHA-256", salt: decodeBase64(payload.salt), iterations: payload.iterations }, material, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
  const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: decodeBase64(payload.iv) }, key, decodeBase64(payload.data));
  return JSON.parse(new TextDecoder().decode(plain)) as Solution[];
}

export default function SolutionVault({ slug, exercises }: { slug: string; exercises: Exercise[] }) {
  const [password, setPassword] = useState("");
  const [solutions, setSolutions] = useState<Solution[] | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function unlock(event: React.FormEvent) {
    event.preventDefault(); setError(""); setBusy(true);
    try { setSolutions(await decrypt(slug, password)); setPassword(""); }
    catch { setSolutions(null); setError("Das Passwort ist nicht korrekt. Bitte Groß-/Kleinschreibung prüfen."); }
    finally { setBusy(false); }
  }

  if (solutions) return (
    <section id="loesungen" className="solution-vault unlocked">
      <div className="vault-heading"><span>✓ Freigeschaltet</span><h2>Lösungen & Erwartungshorizont</h2><button onClick={() => setSolutions(null)}>Wieder sperren</button></div>
      <div className="solution-list">{solutions.map((solution, index) => <details key={solution.id}><summary><span>{String(index + 1).padStart(2, "0")}</span>{solution.title}</summary><div><p>{solution.solution}</p>{solution.checkpoints?.length ? <ul>{solution.checkpoints.map((point) => <li key={point}>{point}</li>)}</ul> : null}</div></details>)}</div>
    </section>
  );

  return (
    <section id="loesungen" className="solution-vault">
      <span>🔒 Kapitelweise verschlüsselt</span><h2>Lösungen mit Lehrkraft-Passwort</h2>
      <p>Die Lösungen zu allen {exercises.length} Aufgaben sind verschlüsselt gespeichert. Für dieses Kapitel gilt ein eigenes Passwort.</p>
      <form onSubmit={unlock} className="unlock-row"><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} aria-label="Kapitelpasswort" placeholder="Kapitelpasswort" autoComplete="off" required /><button disabled={busy}>{busy ? "Prüfe …" : "Lösungen anzeigen"}</button></form>
      {error ? <p className="vault-error" role="alert">{error}</p> : null}
      <small>Hinweis: Die Freigabe gilt nur bis zum Schließen oder Neuladen dieser Seite.</small>
    </section>
  );
}
