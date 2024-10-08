import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { DrawerNode } from '../../../components/molecules/DrawerNode';

describe('DrawerNode component', () => {
  it('toggles the drawer when the button is clicked', async () => {
    const contentText = 'Test Content';
    render(<DrawerNode children={<div>{contentText}</div>} />);

    // Drawerが閉じていることを確認
    expect(screen.queryByText(contentText)).not.toBeInTheDocument();

    // ボタンをクリックしてDrawerを開く
    const openButton = screen.getByRole('button');
    fireEvent.click(openButton);

    // Drawerが開いていることを確認
    expect(screen.getByText(contentText)).toBeInTheDocument();

    // 閉じるボタンをクリックしてDrawerを閉じる
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    // Drawerが閉じたことを確認する (アニメーション等を考慮して非同期的に確認)
    await waitFor(() => {
      expect(screen.queryByText(contentText)).toBeNull();
    });
  });
});
