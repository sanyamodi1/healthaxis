const fs = require('fs');
const path = require('path');

const OUTPUT_FILE = 'README.md';
const IGNORED_FOLDERS = ['node_modules', '.next', '.git', 'public', '.vscode'];

const getLang = (filename) => {
  const ext = path.extname(filename);
  switch (ext) {
    case '.js': return 'js';
    case '.ts': return 'ts';
    case '.tsx': return 'tsx';
    case '.jsx': return 'jsx';
    case '.json': return 'json';
    case '.css': return 'css';
    case '.html': return 'html';
    case '.md': return 'md';
    default: return '';
  }
};

const isCodeFile = (filename) => {
  return /\.(js|ts|jsx|tsx|json|mjs|css|scss|md|html)$/.test(filename);
};

function walkDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!IGNORED_FOLDERS.includes(file)) {
        walkDir(filePath, fileList);
      }
    } else if (isCodeFile(file)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function dumpToReadme(fileList) {
  const output = fs.createWriteStream(OUTPUT_FILE);
  output.write(`# 📁 Project Source Code Dump\n\n`);

  fileList.forEach((filePath) => {
    const relativePath = path.relative(__dirname, filePath);
    const content = fs.readFileSync(filePath, 'utf-8');
    const lang = getLang(filePath);

    output.write(`## 📄 ${relativePath}\n\n`);
    output.write('```' + lang + '\n');
    output.write(content);
    output.write('\n```\n\n');
  });

  output.close();
  console.log(`✅ README.md created with all code files!`);
}

const allFiles = walkDir(__dirname);
dumpToReadme(allFiles);
