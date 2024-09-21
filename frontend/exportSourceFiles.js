const fs = require('fs');
const path = require('path');

// 指定されたディレクトリだけ許可する
const allowedDirs = ['molecules', 'organisms', 'templates']; // 許可するディレクトリ名

// 指定したディレクトリ配下の.tsおよび.tsxファイルを再帰的に取得
function getTsFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    // ディレクトリかどうかをチェック
    if (stat.isDirectory()) {
      // 許可されたディレクトリのみ再帰的に処理
      if (allowedDirs.includes(path.basename(fullPath))) {
        arrayOfFiles = getTsFiles(fullPath, arrayOfFiles);
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

// 指定したファイルの内容をoutput.txtに書き出す
function exportToText(outputPath) {
  const srcDir = path.join(__dirname, 'src');
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
