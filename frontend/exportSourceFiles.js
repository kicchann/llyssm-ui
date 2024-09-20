const fs = require('fs');
const path = require('path');

// 指定したディレクトリ配下の.tsおよび.tsxファイルを再帰的に取得
function getTsFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach((file) => {
    if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
      arrayOfFiles = getTsFiles(path.join(dirPath, file), arrayOfFiles);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      arrayOfFiles.push(path.join(dirPath, file));
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
