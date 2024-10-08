import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { ShowLayerTileGridButton } from '../../../components/molecules/ShowLayerTileGridButton';

describe('ShowLayerTileGridButton component', () => {
  it('renders the button with the correct title and icon', () => {
    render(<ShowLayerTileGridButton onClick={() => {}} />);

    expect(screen.getByTitle('show layer tile grid')).toBeInTheDocument();
    expect(
      screen.getByTitle('show layer tile grid').querySelector('svg')
    ).toBeInTheDocument();
  });

  it('calls onClick when the button is clicked', () => {
    const onClickMock = jest.fn();
    render(<ShowLayerTileGridButton onClick={onClickMock} />);

    fireEvent.click(screen.getByTitle('show layer tile grid'));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
