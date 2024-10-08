import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { LayerTile } from '../../../components/molecules/LayerTile';

describe('LayerTile component', () => {
  const defaultProps = {
    id: '1',
    name: 'Test Layer',
    imageUrl: 'http://example.com/test.jpg',
    imageSize: { width: 100, height: 200 },
    onClick: jest.fn(),
  };

  it('should render the correct name and image', () => {
    render(<LayerTile {...defaultProps} />);

    // テキストが正しくレンダリングされているかを確認
    expect(screen.getByText('Test Layer')).toBeInTheDocument();
    expect(screen.getByText('Size: 100x200')).toBeInTheDocument();

    // 画像が正しくレンダリングされているかを確認
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', defaultProps.imageUrl);
    expect(image).toHaveAttribute('alt', 'Test Layer');
  });

  it('should call onClick with the correct id when clicked', () => {
    render(<LayerTile {...defaultProps} />);

    // カードをクリックしたときにonClickが正しく呼ばれるかを確認
    const card = screen.getByRole('img'); // 画像またはカード領域
    fireEvent.click(card);

    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
    expect(defaultProps.onClick).toHaveBeenCalledWith('1');
  });
});
