import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { SpherePin } from '../../../components/molecules/SpherePin';

describe('SpherePin component', () => {
  const mockOnClick = jest.fn(); // モック関数を作成

  it('renders correctly with the given props', () => {
    render(
      <SpherePin top="50%" left="50%" onClick={mockOnClick} title="Test Pin" />
    );

    const spherePinElement = screen.getByAltText('Sphere Pin'); // 画像のalt属性で要素を取得

    expect(spherePinElement).toBeInTheDocument(); // 画像が正しくレンダリングされるか
    expect(spherePinElement).toHaveAttribute('src', '/images/marker-pano.png'); // 画像のsrcをチェック
  });

  it('applies correct styles based on top and left props', () => {
    const { container } = render(
      <SpherePin top="60%" left="40%" onClick={mockOnClick} title="Test Pin" />
    );
    expect(container.firstChild).toHaveStyle({ top: '60%', left: '40%' }); // topとleftのスタイルが正しく適用されているか
  });

  it('fires onClick event when clicked', () => {
    render(
      <SpherePin top="50%" left="50%" onClick={mockOnClick} title="Test Pin" />
    );

    const spherePinElement = screen.getByTitle('Test Pin');
    fireEvent.click(spherePinElement); // クリックイベントを発火

    expect(mockOnClick).toHaveBeenCalledTimes(1); // onClickが正しく呼び出されたか確認
  });
});
