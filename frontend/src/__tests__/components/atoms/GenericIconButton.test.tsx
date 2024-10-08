import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { GenericIconButton } from '../../../components/atoms/GenericIconButton';

describe('GenericIconButton component', () => {
  it('renders the button with the correct title', () => {
    render(<GenericIconButton title="Test Button" />);

    expect(screen.getByTitle('Test Button')).toBeInTheDocument();
  });

  it('renders the button with the correct icon', () => {
    render(<GenericIconButton title="Test Button" iconType="close" />);
    // svg要素が存在するか確認
    expect(
      screen.getByTitle('Test Button').querySelector('svg')
    ).toBeInTheDocument();
  });

  it('calls onClick when the button is clicked', () => {
    const onClickMock = jest.fn();
    render(<GenericIconButton title="Test Button" onClick={onClickMock} />);

    fireEvent.click(screen.getByTitle('Test Button'));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
