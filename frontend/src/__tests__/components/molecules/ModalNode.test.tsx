import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { ModalNode } from '../../../components/molecules/ModalNode';

describe('ModalNode component', () => {
  const contentText = 'Test Modal Content';
  const handleClose = jest.fn();

  it('opens and closes the modal', () => {
    render(
      <ModalNode
        open={true}
        onClose={handleClose}
        content={<div>{contentText}</div>}
      />
    );

    // モーダルが表示されていることを確認
    expect(screen.getByText(contentText)).toBeInTheDocument();

    // 閉じるボタンをクリック
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    // onCloseが呼ばれたことを確認
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('closes the modal on ESC key press', () => {
    render(
      <ModalNode
        open={true}
        onClose={handleClose}
        content={<div>{contentText}</div>}
      />
    );

    // 上の閉じるボタンのテストで、一度onCloseが呼ばれているため、
    // 呼び出し履歴をクリア
    handleClose.mockClear();

    // ESCキーを押す
    fireEvent.keyDown(document, { key: 'Escape' });

    // onCloseが呼ばれたことを確認
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
