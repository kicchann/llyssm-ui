import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { CustomImage } from '../../../components/atoms/CustomImage';

describe('CustomImage component', () => {
  it('renders the image with the correct src and alt', () => {
    render(<CustomImage src="test.jpg" alt="test" />);

    expect(screen.getByAltText('test')).toBeInTheDocument();
    expect(screen.getByAltText('test')).toHaveAttribute('src', 'test.jpg');
  });
});
