import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { LocationTooltip } from '../../../components/molecules/LocationTooltip';
import { LocationData } from '../../../types/location';

describe('LocationTooltip component', () => {
  // leafletがうまくテストできないため、LocationTooltipコンポーネントのテストはFAILする
  const mockLocationData: LocationData = {
    id: 'location01',
    name: 'Test Location',
    description: 'Test location description',
    geoLocation: { latitude: 35.6895, longitude: 139.6917 },
    iconType: 'default',
  };

  const handleClick = jest.fn();

  it('displays the correct location data', () => {
    render(
      <LocationTooltip locationData={mockLocationData} onClick={handleClick} />
    );

    // 表示される内容が正しいことを確認
    expect(screen.getByText(mockLocationData.name)).toBeInTheDocument();
    expect(screen.getByText(mockLocationData.description)).toBeInTheDocument();
  });

  it('calls the onClick handler when clicked', () => {
    render(
      <LocationTooltip locationData={mockLocationData} onClick={handleClick} />
    );

    // ポップアップ内の要素をクリック
    fireEvent.click(screen.getByText(/クリックで詳細ページへ/i));

    // onClickが呼び出されたことを確認
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
