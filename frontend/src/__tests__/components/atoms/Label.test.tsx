import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Label } from '../../../components/atoms/Label';

describe('Label component', () => {
  it('renders text correctly', () => {
    // テスト用のプロパティ
    const labelText = 'Test Label';

    // コンポーネントをレンダリング
    render(<Label text={labelText} />);

    // テキストが正しく表示されているか確認
    const renderedLabel = screen.getByText(labelText);
    expect(renderedLabel).toBeInTheDocument();
  });

  it('renders text with color correctly', () => {
    const labelText = 'Colored Label';
    const labelColor = 'red';

    // 色指定付きでコンポーネントをレンダリング
    render(<Label text={labelText} color={labelColor} />);

    // テキストが正しく表示されているか確認
    const renderedLabel = screen.getByText(labelText);

    // スタイルのcolorが正しいか確認
    expect(renderedLabel).toHaveStyle({ color: labelColor });
  });
});

test('Label component snapshot', () => {
  const { asFragment } = render(<Label text="Snapshot Test" color="red" />);
  expect(asFragment()).toMatchSnapshot();
});
