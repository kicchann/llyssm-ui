import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { LayerTileGridButton } from '../../../components/atoms/LayerTileGridButton';

describe('LayerTileGridButton component', () => {
  it('renders the button with the correct title', () => {
    render(<LayerTileGridButton />);

    expect(screen.getByTitle('レイヤー一覧')).toBeInTheDocument();
  });

  it('calls onClick when the button is clicked', () => {
    const onClickMock = jest.fn();
    render(<LayerTileGridButton onClick={onClickMock} />);

    fireEvent.click(screen.getByTitle('レイヤー一覧'));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
