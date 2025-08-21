#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const token = process.env.SENTRY_AUTH_TOKEN;

if (!token) {
  console.log('Skipping Sentry sourcemaps upload: SENTRY_AUTH_TOKEN is not set.');
  process.exit(0);
}

const binDir = path.join(process.cwd(), 'node_modules', '.bin');
const exe = process.platform === 'win32' ? 'sentry-cli.cmd' : 'sentry-cli';
const localBin = path.join(binDir, exe);
const cmd = fs.existsSync(localBin) ? localBin : exe;

const args = [
  'sourcemaps',
  'upload',
  '--org', 'meself-vu',
  '--project', 'javascript-react',
  './',
  '--ignore-file', '.sentryignore'
];

console.log('Uploading sourcemaps to Sentry...');
const child = spawn(cmd, args, { stdio: 'inherit', shell: false });

child.on('close', (code) => {
  if (code !== 0) {
    console.error(`sentry-cli exited with code ${code}`);
  }
  process.exit(code);
});
