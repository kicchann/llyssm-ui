import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { Sidebar } from '../../../components/molecules/Sidebar';

describe('Sidebar component', () => {
  const contentText = 'Sidebar Content';

  it('displays content when open', () => {
    render(<Sidebar isOpen={true} content={<div>{contentText}</div>} />);

    // サイドバーが表示されていることを確認
    expect(screen.getByText(contentText)).toBeVisible();
  });

  it('hides content when closed', async () => {
    render(<Sidebar isOpen={false} content={<div>{contentText}</div>} />);

    // サイドバーがDOM内に存在していることを確認
    const sidebarContent = screen.getByText(contentText);
    expect(sidebarContent).toBeInTheDocument();

    // もしくはaria-hidden属性を確認
    await waitFor(() => {
      expect(sidebarContent.parentElement).toHaveAttribute(
        'aria-hidden',
        'true'
      );
    });
  });
});
