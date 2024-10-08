import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { ToggleSidebarButton } from '../../../components/molecules/ToggleSidebarButton';

describe('ToggleSidebarButton', () => {
  it('should render with open icon and label when isOpen is false', () => {
    render(<ToggleSidebarButton isOpen={false} onToggle={jest.fn()} />);

    const button = screen.getByRole('button', { name: /open sidebar/i });
    expect(button).toBeInTheDocument();
    expect(
      screen.getByTitle('open drawer').querySelector('svg')
    ).toBeInTheDocument();
  });

  it('should render with close icon and label when isOpen is true', () => {
    render(<ToggleSidebarButton isOpen={true} onToggle={jest.fn()} />);

    const button = screen.getByRole('button', { name: /close sidebar/i });
    expect(button).toBeInTheDocument();
    expect(
      screen.getByTitle('close drawer').querySelector('svg')
    ).toBeInTheDocument();
  });

  it('should call onToggle when the button is clicked', () => {
    const onToggleMock = jest.fn();
    render(<ToggleSidebarButton isOpen={false} onToggle={onToggleMock} />);

    const button = screen.getByRole('button', { name: /open sidebar/i });
    fireEvent.click(button);

    expect(onToggleMock).toHaveBeenCalledTimes(1);
  });
});
