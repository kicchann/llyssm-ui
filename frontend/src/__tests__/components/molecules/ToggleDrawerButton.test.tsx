import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { ToggleDrawerButton } from '../../../components/molecules/ToggleDrawerButton';

describe('ToggleDrawerButton', () => {
  it('should render with open icon and label when isOpen is false', () => {
    render(<ToggleDrawerButton isOpen={false} onToggle={jest.fn()} />);

    const button = screen.getByRole('button', { name: /open drawer/i });
    expect(button).toBeInTheDocument();
    expect(
      screen.getByTitle('open drawer').querySelector('svg')
    ).toBeInTheDocument();
  });

  it('should render with close icon and label when isOpen is true', () => {
    render(<ToggleDrawerButton isOpen={true} onToggle={jest.fn()} />);

    const button = screen.getByRole('button', { name: /close drawer/i });
    expect(button).toBeInTheDocument();
    expect(
      screen.getByTitle('close drawer').querySelector('svg')
    ).toBeInTheDocument();
  });

  it('should call onToggle when the button is clicked', () => {
    const onToggleMock = jest.fn();
    render(<ToggleDrawerButton isOpen={false} onToggle={onToggleMock} />);

    const button = screen.getByRole('button', { name: /open drawer/i });
    fireEvent.click(button);

    expect(onToggleMock).toHaveBeenCalledTimes(1);
  });
});
