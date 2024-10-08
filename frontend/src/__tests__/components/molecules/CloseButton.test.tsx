import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { CloseButton } from '../../../components/molecules/CloseButton';

describe('CloseButton component', () => {
  it('renders the button with the correct title and icon', () => {
    render(<CloseButton onClick={() => {}} />);

    expect(screen.getByTitle('close')).toBeInTheDocument();
    expect(screen.getByTitle('close').querySelector('svg')).toBeInTheDocument();
  });

  it('calls onClick when the button is clicked', () => {
    const onClickMock = jest.fn();
    render(<CloseButton onClick={onClickMock} />);

    fireEvent.click(screen.getByTitle('close'));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
