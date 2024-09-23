import { useEffect, useState } from 'react';
import { ApiService } from '../services/apiService'; // APIサービス

export const useFetchSignedUrl = (fileId: string) => {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const url = await ApiService.getSignedUrl(fileId);
        setSignedUrl(url);
      } catch (err) {
        setError('署名付きURLの取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchUrl();
  }, [fileId]);

  return { signedUrl, loading, error };
};
