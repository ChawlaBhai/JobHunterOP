import { readdirSync, statSync, readFileSync, writeFileSync, renameSync, unlinkSync, existsSync, mkdirSync } from 'fs';
import { join, resolve, dirname, basename } from 'path';

const projectRoot = resolve('.');

function walk(dir, callback) {
  if (!existsSync(dir)) return;
  const files = readdirSync(dir);
  for (const file of files) {
    const fullPath = join(dir, file);
    if (file === '.git' || file === 'node_modules' || file === 'website' || file === 'rewire.mjs') continue;
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath, callback);
    }
    callback(fullPath, stat);
  }
}

console.log('🔄 Starting project rewiring to JobHunterOP by Bidi Bhai...');

const filesToProcess = [];
walk(projectRoot, (filePath, stat) => {
  if (stat.isFile()) {
    filesToProcess.push(filePath);
  }
});

// 1. Process all file contents
for (const file of filesToProcess) {
  try {
    let content = readFileSync(file, 'utf8');
    const original = content;

    // Replace repos and sites
    content = content.replace(/https:\/\/github\.com\/santifer\/career-ops/g, 'https://github.com/bidi-bhai/JobHunterOP');
    content = content.replace(/https:\/\/career-ops\.org/g, 'https://jobhunterop.cc');
    content = content.replace(/cv-santiago/gi, 'cv-bidi');
    content = content.replace(/santifer\.io/g, 'bidi-bhai.github.io');
    content = content.replace(/hi@santifer\.io/g, 'bidibhai@example.com');
    content = content.replace(/santifer/g, 'bidi-bhai');
    
    // Replace names
    content = content.replace(/Santiago Fernández de Valderrama/g, 'Bidi Bhai');
    content = content.replace(/santiago/gi, 'Bidi');
    content = content.replace(/Santiago/gi, 'Bidi');
    content = content.replace(/Bidi/g, 'Bidi');

    // Replace project names
    content = content.replace(/career-ops/g, 'jobhunter-op');
    content = content.replace(/Career-Ops/g, 'JobHunterOP');
    content = content.replace(/careerops/g, 'jobhunterop');

    // Replace CLI command prefixes
    content = content.replace(/\/career-ops/g, '/jobhunter-op');

    if (content !== original) {
      writeFileSync(file, content, 'utf8');
      console.log(`📝 Content rewired: ${file}`);
    }
  } catch (err) {
    // Skip binary files
  }
}

// 2. Rename files/folders containing "career-ops" or "careerops" in their actual basename
const itemsToRename = [];
walk(projectRoot, (filePath, stat) => {
  const base = basename(filePath);
  if (base.includes('career-ops') || base.includes('careerops')) {
    itemsToRename.push({ path: filePath, isDir: stat.isDirectory() });
  }
});

// Sort by path depth descending so we rename children before parents
itemsToRename.sort((a, b) => b.path.split('/').length - a.path.split('/').length);

for (const item of itemsToRename) {
  const oldPath = item.path;
  const relativePath = oldPath.slice(projectRoot.length);
  const newRelativePath = relativePath
    .replace(/career-ops/g, 'jobhunter-op')
    .replace(/careerops/g, 'jobhunterop');
  
  const newPath = join(projectRoot, newRelativePath);
  
  if (oldPath !== newPath && existsSync(oldPath)) {
    mkdirSync(dirname(newPath), { recursive: true });
    renameSync(oldPath, newPath);
    console.log(`📁 Renamed: ${oldPath} ➡️ ${newPath}`);
  }
}

console.log('✅ Rewiring complete!');
