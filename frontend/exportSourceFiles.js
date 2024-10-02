const fs = require('fs');
const path = require('path');

// 許可するトップレベルのディレクトリ
const allowedDirs = ['src']; // 許可するトップレベルのディレクトリ名

// 指定したディレクトリ配下の .ts および .tsx ファイルを再帰的に取得
function getTsFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    // ディレクトリの場合
    if (stat.isDirectory()) {
      // 最初のトップレベルディレクトリが許可されている場合は再帰的に探索
      if (allowedDirs.some((allowedDir) => dirPath.includes(allowedDir))) {
        arrayOfFiles = getTsFiles(fullPath, arrayOfFiles);
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      // .ts および .tsx ファイルを追加
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

// 指定したファイルの内容を output.txt に書き出す
function exportToText(outputPath) {
  const srcDir = path.join(__dirname, 'src/components/molecules');
  const tsFiles = getTsFiles(srcDir);

  const output = tsFiles
    .map((filePath) => {
      const content = fs.readFileSync(filePath, 'utf-8');
      return `--- ${filePath} ---\n${content}\n`;
    })
    .join('\n');

  fs.writeFileSync(outputPath, output);
  console.log(`Successfully exported ${tsFiles.length} files to ${outputPath}`);
}

// 実行
const outputFilePath = path.join(__dirname, 'output.txt');
exportToText(outputFilePath);
