const fs = require('fs');
const path = require('path');

// スキップしたい文字列のパターンを指定
const excludePatterns = ['.git', 'node_modules']; // 例として「skip」、「.git」、「node_modules」をスキップ

// ディレクトリ構造を再帰的に探索
function getDirectoryStructure(dir, depth = 0) {
  let structure = '';
  const items = fs.readdirSync(dir);

  items.forEach((item) => {
    const fullPath = path.join(dir, item);
    const stats = fs.statSync(fullPath);

    // スキップする条件を確認
    if (excludePatterns.some((pattern) => item.includes(pattern))) {
      return; // このアイテムをスキップ
    }

    // インデントを作成
    const indent = ' '.repeat(depth * 2);

    // ファイルやディレクトリの名前を追加
    structure += `${indent}${item}\n`;

    // ディレクトリの場合は再帰的に探索
    if (stats.isDirectory()) {
      structure += getDirectoryStructure(fullPath, depth + 1);
    }
  });

  return structure;
}

// ディレクトリ構造を取得して output.txt に書き込み
const rootDir = '.'; // ここに対象ディレクトリのパスを指定（例: './my-folder'）
const outputFilePath = 'dir.txt';

const directoryStructure = getDirectoryStructure(rootDir);
fs.writeFileSync(outputFilePath, directoryStructure);

console.log(`ディレクトリ構造が ${outputFilePath} に保存されました！`);
