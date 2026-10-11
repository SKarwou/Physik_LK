import path from 'node:path';
import { rm } from 'node:fs/promises';
import { build } from 'vite';
import { projectRoot, writeProtectedCourses } from './protected-build.mjs';

const outDir = path.join(projectRoot, 'docs');
try {
  await build({ root: projectRoot });
  await writeProtectedCourses(outDir);
  await import('./verify-protected.mjs');
} catch (error) {
  // A failed course build must never leave a deployable, partially protected site.
  await rm(outDir, { recursive: true, force: true });
  console.error(error);
  process.exitCode = 1;
}
