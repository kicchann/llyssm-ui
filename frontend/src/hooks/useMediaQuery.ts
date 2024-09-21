import { useMediaQuery as muiUseMediaQuery, useTheme } from '@mui/material';

// MUIのブレークポイントシステムに対応した定義
export const mediaQuery = {
  mobile: 'down', // スマートフォンサイズ
  tablet: 'between', // タブレットサイズ
  pc: 'up', // PCサイズ
};

// ブレークポイントに基づいてクエリを生成
export const useMediaQuery = (queryKey: keyof typeof mediaQuery) => {
  const theme = useTheme(); // MUIのテーマを取得
  let query: string;

  // 必要に応じて適切なクエリを作成
  switch (queryKey) {
    case 'mobile':
      query = theme.breakpoints.down('sm'); // スマートフォンサイズ（小さい画面）
      break;
    case 'tablet':
      query = theme.breakpoints.between('sm', 'md'); // タブレットサイズ
      break;
    case 'pc':
      query = theme.breakpoints.up('md'); // PCサイズ
      break;
    default:
      throw new Error(`Invalid queryKey: ${queryKey}`);
  }

  const matches = muiUseMediaQuery(query); // MUIのuseMediaQueryを使用

  return matches; // true/falseを返す
};
