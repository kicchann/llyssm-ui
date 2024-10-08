const { createDefaultPreset } = require('ts-jest');

/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: 'ts-jest', // ts-jestを使うことを指定
  testEnvironment: 'jsdom', // DOMのシミュレーション環境を使用
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // 必要に応じてエイリアスを設定
    '\\.(css|less)$': 'identity-obj-proxy', // CSSファイルをモック化
  },
  transform: {
    ...createDefaultPreset().transform,
    // [...]
  },
  transformIgnorePatterns: [
    '/node_modules/(?!react-leaflet|@react-leaflet|leaflet).+\\.js$', // leafletのJSファイルを変換対象に含める
  ],
};
