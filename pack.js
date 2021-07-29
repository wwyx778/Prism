const {
  copySync,
  readFileSync,
  outputFileSync,
  readdirSync,
  createWriteStream,
  ensureDirSync,
  removeSync,
} = require('fs-extra'); // eslint-disable-line import/no-extraneous-dependencies
const { join } = require('path');
const archiver = require('archiver'); // eslint-disable-line import/no-extraneous-dependencies

const dir = (...s) => join(__dirname, ...s);
// 取 dist 下的 index.html
const index = readFileSync(dir('dist', 'index.html'), 'utf8');

copySync(dir('dist'), dir('temp'), {
  filter(src) {
    return !src.includes('/index.html');
  },
});
outputFileSync(dir('temp', 'index.html'), index.replace(/hash: '.*?',/, "hash: '',"));

ensureDirSync(dir('release'));

const files = readdirSync(dir('temp'));
const output = createWriteStream(dir('release', 'Prism.zip'));
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  global.console.log(`Prism.zip [${archive.pointer()} bytes]`);
  removeSync(dir('temp'));
});
archive.on('error', err => {
  throw err;
});
archive.pipe(output);
files.forEach(file => archive.file(dir('temp', file), { name: file }));
archive.finalize();
