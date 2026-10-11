import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { randomBytes, pbkdf2Sync, createCipheriv, createDecipheriv } from 'node:crypto';
import { build } from 'vite';
import react from '@vitejs/plugin-react';
import * as React from 'react';
import ts from 'typescript';
import { protectedCourses, publicCourses } from './protected-courses.mjs';

export const projectRoot = fileURLToPath(new URL('../', import.meta.url));
export const encryptionIterations = 310000;
const iqbPath = path.join(projectRoot, 'src/learning/iqbPractice.ts');
const slash = value => value.replaceAll('\\', '/');
const protectedDirectories = protectedCourses.map(course => slash(path.dirname(path.join(projectRoot, course.entry))) + '/');
let previousIqbSource, previousIqbModule;

async function iqbModule() {
  const source = await readFile(iqbPath, 'utf8');
  if (source !== previousIqbSource) {
    const { outputText } = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } });
    previousIqbModule = import('data:text/javascript;base64,' + Buffer.from(outputText).toString('base64'));
    previousIqbSource = source;
  }
  return previousIqbModule;
}

/** Shared practice data must obey exactly the same boundary as the course code. */
function isolatePractice(slugs) {
  return {
    name: 'physik-isolate-practice', enforce: 'pre',
    async load(id) {
      if (slash(id.split('?')[0]) !== slash(iqbPath)) return;
      const { IQB_URL, iqbPractice } = await iqbModule();
      const data = Object.fromEntries(slugs.map(slug => {
        if (!iqbPractice[slug]) throw new Error(`IQB practice missing for ${slug}`);
        return [slug, iqbPractice[slug]];
      }));
      return `export const IQB_URL=${JSON.stringify(IQB_URL)};export const iqbPractice=${JSON.stringify(data)};`;
    },
  };
}

/** Fails closed if someone accidentally reconnects protected lessons to the app. */
export function publicCourseIsolation() {
  const iqb = isolatePractice(publicCourses);
  return {
    ...iqb,
    name: 'physik-public-course-boundary',
    generateBundle(_options, output) {
      for (const item of Object.values(output)) {
        if (item.type !== 'chunk') continue;
        for (const id of item.moduleIds) {
          const normal = slash(id.split('?')[0]);
          if (protectedDirectories.some(directory => normal.startsWith(directory)) && !normal.endsWith('.css')) {
            this.error(`Protected course code leaked into the public build: ${path.relative(projectRoot, id)}`);
          }
          if (normal === slash(path.join(projectRoot, 'src/chapters.ts'))) {
            this.error('The legacy chapters registry contains protected lesson text. Import only the extracted public chapter.');
          }
        }
        if (protectedCourses.some(course => item.code.includes(course.password))) this.error('A build-only course password leaked into the public bundle.');
      }
    },
  };
}

function runtimeBridge() {
  const aliases = { react: '\0physik-react', 'react/jsx-runtime': '\0physik-jsx', 'react/jsx-dev-runtime': '\0physik-jsx-dev', katex: '\0physik-katex' };
  const reactNames = Object.keys(React).filter(name => name !== 'default' && /^[a-zA-Z_$][\w$]*$/.test(name));
  const requireBridge = `const shared=globalThis.__PHYSIK_SHARED__;if(!shared)throw new Error('Physik runtime bridge is missing');`;
  return {
    name: 'physik-shared-runtime', enforce: 'pre',
    resolveId(source) { return aliases[source]; },
    load(id) {
      if (id === aliases.react) return `${requireBridge}const React=shared.React;export default React;export const {${reactNames.join(',')}}=React;`;
      if (id === aliases['react/jsx-runtime']) return `${requireBridge}const runtime=shared.jsxRuntime;export const {Fragment,jsx,jsxs}=runtime;export default runtime;`;
      if (id === aliases['react/jsx-dev-runtime']) throw new Error('A development JSX runtime must not be present in encrypted production modules.');
      if (id === aliases.katex) return `${requireBridge}export default shared.katex;`;
    },
  };
}

export async function bundleCourse(course) {
  const result = await build({
    configFile: false, root: projectRoot, base: './', publicDir: false, logLevel: 'error',
    plugins: [runtimeBridge(), isolatePractice([course.slug]), react()],
    define: { 'process.env.NODE_ENV': JSON.stringify('production') },
    build: {
      write: false, sourcemap: false, minify: true, cssMinify: true, cssCodeSplit: false,
      lib: { entry: path.join(projectRoot, course.entry), formats: ['es'], fileName: 'course', cssFileName: 'course' },
      rolldownOptions: { output: { codeSplitting: false } },
    },
  });
  const outputs = (Array.isArray(result) ? result : [result]).flatMap(item => item.output);
  const chunks = outputs.filter(item => item.type === 'chunk');
  const assets = outputs.filter(item => item.type === 'asset');
  if (chunks.length !== 1 || chunks[0].imports.length || chunks[0].dynamicImports.length) {
    throw new Error(`${course.slug}: expected one self-contained ES module with no runtime imports`);
  }
  if (assets.some(item => !item.fileName.endsWith('.css'))) throw new Error(`${course.slug}: unexpected unencrypted asset; inline it in the protected package first`);
  if (chunks[0].code.includes('sourceMappingURL')) throw new Error(`${course.slug}: source maps are not allowed`);
  const payload = { version: 1, slug: course.slug, js: chunks[0].code, css: assets.map(item => typeof item.source === 'string' ? item.source : Buffer.from(item.source).toString('utf8')).join('\n') };
  return payload;
}

export function encryptCourse(course, payload) {
  const salt = randomBytes(16), iv = randomBytes(12);
  const key = pbkdf2Sync(course.password, salt, encryptionIterations, 32, 'sha256');
  const cipher = createCipheriv('aes-256-gcm', key, iv);
  cipher.setAAD(Buffer.from(`physik-lk:${course.slug}:v1`, 'utf8'));
  const plaintext = Buffer.from(JSON.stringify(payload), 'utf8');
  const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final(), cipher.getAuthTag()]);
  return { version: 1, slug: course.slug, cipher: 'AES-GCM', kdf: 'PBKDF2', hash: 'SHA-256', iterations: encryptionIterations, salt: salt.toString('base64'), iv: iv.toString('base64'), ciphertext: encrypted.toString('base64') };
}

export function decryptCourse(envelope, password) {
  const key = pbkdf2Sync(password, Buffer.from(envelope.salt, 'base64'), envelope.iterations, 32, 'sha256');
  const bytes = Buffer.from(envelope.ciphertext, 'base64');
  const decipher = createDecipheriv('aes-256-gcm', key, Buffer.from(envelope.iv, 'base64'));
  decipher.setAAD(Buffer.from(`physik-lk:${envelope.slug}:v1`, 'utf8'));
  decipher.setAuthTag(bytes.subarray(-16));
  return JSON.parse(Buffer.concat([decipher.update(bytes.subarray(0, -16)), decipher.final()]).toString('utf8'));
}

export async function createEncryptedCourse(course) {
  const payload = await bundleCourse(course);
  const envelope = encryptCourse(course, payload);
  const verified = decryptCourse(envelope, course.password);
  if (verified.js !== payload.js || verified.css !== payload.css || verified.slug !== course.slug) throw new Error(`${course.slug}: encryption round-trip failed`);
  return envelope;
}

export async function writeProtectedCourses(outDir = path.join(projectRoot, 'docs')) {
  const directory = path.join(outDir, 'protected');
  await mkdir(directory, { recursive: true });
  for (const course of protectedCourses) {
    const envelope = await createEncryptedCourse(course);
    await writeFile(path.join(directory, `${course.slug}.json`), JSON.stringify(envelope));
    console.log(`Encrypted ${course.slug}`);
  }
}

/** Local dev serves the same encrypted format, rebuilt after source changes. */
export function protectedDevMiddleware() {
  return {
    name: 'physik-encrypted-development', apply: 'serve',
    configureServer(server) {
      const cache = new Map();
      const clear = file => { if (slash(file).startsWith(slash(path.join(projectRoot, 'src')) + '/')) cache.clear(); };
      server.watcher.on('change', clear);
      server.httpServer?.once('close', () => server.watcher.off('change', clear));
      server.middlewares.use(async (request, response, next) => {
        const pathname = new URL(request.url || '/', 'http://localhost').pathname;
        const match = pathname.match(/\/protected\/([a-z0-9-]+)\.json$/);
        if (!match) return next();
        const course = protectedCourses.find(item => item.slug === match[1]);
        if (!course) { response.statusCode = 404; response.end(); return; }
        try {
          if (!cache.has(course.slug)) cache.set(course.slug, createEncryptedCourse(course));
          const envelope = await cache.get(course.slug);
          response.setHeader('Content-Type', 'application/json; charset=utf-8');
          response.setHeader('Cache-Control', 'no-store');
          response.end(JSON.stringify(envelope));
        } catch (error) {
          cache.delete(course.slug);
          server.config.logger.error(String(error));
          response.statusCode = 500;
          response.end('Protected course could not be built.');
        }
      });
    },
  };
}
