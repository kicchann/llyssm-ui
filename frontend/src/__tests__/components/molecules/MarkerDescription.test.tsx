import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MarkerDescription } from '../../../components/molecules/MarkerDescription';

describe('MarkerDescription component', () => {
  it('renders MarkerDescription with title and description', () => {
    render(
      <MarkerDescription title="Test Title" description="Test Description" />
    );

    // タイトルと説明が正しく表示されるかを確認
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();

    // ID属性が正しく設定されているか確認
    expect(screen.getByTestId('marker-modal-title')).toBeInTheDocument();
    expect(screen.getByTestId('marker-modal-description')).toBeInTheDocument();
  });
});
