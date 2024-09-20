# ベースイメージの指定
FROM node:18-alpine

# 作業ディレクトリの設定
WORKDIR /app

# パッケージファイルのコピー
COPY package.json ./

# 依存関係のインストール
RUN npm install --legacy-peer-deps

# アプリケーションのソースコードをコピー
COPY . .

# アプリケーションをビルド
# RUN npm run build

# ポートの公開
EXPOSE 3000

# コンテナ起動時のコマンド
CMD ["npm", "start"]
