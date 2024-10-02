import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { ToggleSidebarButton } from '../../../components/atoms/ToggleSidebarButton';

describe('ToggleSidebarButton component', () => {
  it('renders the correct icon and title when the sidebar is open', () => {
    render(<ToggleSidebarButton isSidebarOpen={true} onToggle={() => {}} />);

    expect(screen.getByTitle('サイドバーを閉じる')).toBeInTheDocument();
    expect(
      screen.getByTestId('KeyboardDoubleArrowLeftIcon')
    ).toBeInTheDocument();
  });

  it('renders the correct icon and title when the sidebar is closed', () => {
    render(<ToggleSidebarButton isSidebarOpen={false} onToggle={() => {}} />);

    expect(screen.getByTitle('サイドバーを開く')).toBeInTheDocument();
    expect(
      screen.getByTestId('KeyboardDoubleArrowRightIcon')
    ).toBeInTheDocument();
  });

  it('calls onToggle when the button is clicked', () => {
    const onToggleMock = jest.fn();
    render(
      <ToggleSidebarButton isSidebarOpen={false} onToggle={onToggleMock} />
    );

    fireEvent.click(screen.getByTitle('サイドバーを開く'));
    expect(onToggleMock).toHaveBeenCalledTimes(1);
  });
});
