import { render } from '@testing-library/react';
import { MarkerTooltip } from '../../../components/molecules/MarkerTooltip';
import { MarkerData } from '../../../types/marker';

const mockMarkerData: MarkerData = {
  id: '1',
  sphereId: '1',
  name: 'Sample Marker',
  description: 'This is a sample marker description.',
  orientation: { yaw: 0, pitch: 0 },
  imageUrl: 'https://example.com/image.jpg',
  thumbnailUrl: 'https://example.com/image.jpg',
  markerType: 'image',
  createdAt: '2021-01-01T00:00:00.000Z',
};

describe('MarkerTooltip', () => {
  it('renders correctly with valid marker data', () => {
    const { container } = render(<MarkerTooltip markerData={mockMarkerData} />);
    expect(container).toMatchSnapshot();
  });
});
