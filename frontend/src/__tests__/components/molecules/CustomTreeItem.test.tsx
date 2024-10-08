import { SimpleTreeView } from '@mui/x-tree-view';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { CustomTreeItem } from '../../../components/molecules/CustomTreeItem';

describe('CustomTreeItem component', () => {
  const handleClick = jest.fn();
  const labelText = 'Test Node';

  it('renders the label and handles click event', () => {
    render(
      <SimpleTreeView>
        <CustomTreeItem
          id="node01"
          label={labelText}
          onItemClick={handleClick}
        />
      </SimpleTreeView>
    );

    const nodeElement = screen.getByText(labelText);
    expect(nodeElement).toBeInTheDocument();

    // クリックイベントを確認
    fireEvent.click(nodeElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
