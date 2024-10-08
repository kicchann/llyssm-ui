import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { ErrorSnackbar } from '../../../components/atoms/ErrorSnackbar';

describe('ErrorSnackbar component', () => {
  it('renders and shows the correct message when open', () => {
    const message = 'This is an error';
    render(<ErrorSnackbar open={true} message={message} onClose={() => {}} />);

    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('does not show the message when not open', () => {
    const message = 'This is an error';
    render(<ErrorSnackbar open={false} message={message} onClose={() => {}} />);

    expect(screen.queryByText(message)).not.toBeInTheDocument();
  });

  it('calls onClose when closed', () => {
    const message = 'This is an error';
    const onCloseMock = jest.fn();

    render(
      <ErrorSnackbar open={true} message={message} onClose={onCloseMock} />
    );

    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
