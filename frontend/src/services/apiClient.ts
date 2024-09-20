import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api', // APIのベースURL
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 共通のリクエスト・レスポンス処理を追加
apiClient.interceptors.request.use(
  (config) => {
    // 必要に応じてトークンなどのヘッダーを追加
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // エラーハンドリング
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default apiClient;
