import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { CenterBoxWithTransform } from '../../../components/molecules/CenterBoxWithTransform';

describe('CenterBoxWithTransform component', () => {
  it('renders children correctly', () => {
    // テスト用のプロパティ
    const testText = 'Test Text';

    // コンポーネントをレンダリング
    render(
      <CenterBoxWithTransform>
        <div>{testText}</div>
      </CenterBoxWithTransform>
    );

    // テキストが正しく表示されているか確認
    const renderedText = screen.getByText(testText);
    expect(renderedText).toBeInTheDocument();
  });

  it('should zoom in and out using the wheel', () => {
    const { getByText } = render(
      <CenterBoxWithTransform>
        <div>Zoomable Content</div>
      </CenterBoxWithTransform>
    );

    const zoomableElement = getByText('Zoomable Content').parentElement!;

    // ホイールイベントをシミュレートしてズーム機能を確認
    fireEvent.wheel(zoomableElement, { deltaY: -100 }); // ズームイン
    fireEvent.wheel(zoomableElement, { deltaY: 100 }); // ズームアウト
  });

  it('should pan the content', () => {
    const { getByText } = render(
      <CenterBoxWithTransform>
        <div>Zoomable Content</div>
      </CenterBoxWithTransform>
    );

    const zoomableElement = getByText('Zoomable Content').parentElement!;

    // ドラッグイベントをシミュレートしてパン機能を確認
    fireEvent.mouseDown(zoomableElement, { clientX: 50, clientY: 50 });
    fireEvent.mouseMove(zoomableElement, { clientX: 100, clientY: 100 });
    fireEvent.mouseUp(zoomableElement);
  });
});
