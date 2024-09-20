# ベースイメージの指定
FROM node:18-alpine

# Firebase CLI をインストール
RUN npm install -g firebase-tools

# 作業ディレクトリの設定
WORKDIR /app

# 依存関係をインストール
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# アプリケーションのソースコードをコピー
COPY . .

# アプリケーションをビルド
RUN npm run build

# ポートの公開
EXPOSE 3000

# コンテナ起動時のコマンド
CMD ["npm", "start"]
