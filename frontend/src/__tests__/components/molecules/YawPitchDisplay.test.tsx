import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { YawPitchDisplay } from '../../../components/molecules/YawPitchDisplay';

describe('YawPitchDisplay component', () => {
  it('displays the correct yaw and pitch values', () => {
    const yawValue = 45.3;
    const pitchValue = -10.2;

    render(<YawPitchDisplay yaw={yawValue} pitch={pitchValue} />);

    // YawとPitchの値が正しく表示されているか確認
    expect(
      screen.getByText(`Yaw: ${yawValue.toFixed(1)}°`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Pitch: ${pitchValue.toFixed(1)}°`)
    ).toBeInTheDocument();
  });
});
