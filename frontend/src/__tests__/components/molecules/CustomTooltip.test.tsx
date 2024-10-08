import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MarkerTooltip } from '../../../components/molecules/MarkerTooltip';
import { MarkerData } from '../../../types/marker';

describe('CustomTooltip component', () => {
  const mockMarkerData: MarkerData = {
    id: 'marker01',
    name: 'Test Marker',
    description: 'This is a test marker description.',
    thumbnailUrl: '/path/to/test-thumbnail.jpg',
    sphereId: 'sphere01',
    orientation: { yaw: 0, pitch: 0 },
    imageUrl: '/path/to/image.jpg',
    markerType: 'default',
    createdAt: '2023-01-01T00:00:00',
  };

  it('displays the correct title', () => {
    render(<MarkerTooltip markerData={mockMarkerData} />);
    const titleElement = screen.getByText(mockMarkerData.name);
    expect(titleElement).toBeInTheDocument();
  });

  it('displays the correct description', () => {
    render(<MarkerTooltip markerData={mockMarkerData} />);
    const descriptionElement = screen.getByText(mockMarkerData.description);
    expect(descriptionElement).toBeInTheDocument();
  });

  it('displays the correct image', () => {
    render(<MarkerTooltip markerData={mockMarkerData} />);
    const imageElement = screen.getByAltText(mockMarkerData.name);
    expect(imageElement).toHaveAttribute('src', mockMarkerData.thumbnailUrl);
  });
});
