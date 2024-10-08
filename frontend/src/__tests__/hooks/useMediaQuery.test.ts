import * as mui from '@mui/material';
import { useTheme } from '@mui/material';
import { renderHook } from '@testing-library/react';
import { useMediaQuery } from '../../hooks/useMediaQuery';

jest.mock('@mui/material', () => ({
  useTheme: jest.fn(),
  useMediaQuery: jest.fn(),
}));

describe('useMediaQuery', () => {
  it('should return true for mobile query', () => {
    (useTheme as jest.Mock).mockReturnValue({
      breakpoints: {
        down: jest.fn(() => 'down-sm'),
      },
    });
    (mui.useMediaQuery as jest.Mock).mockReturnValue(true);

    const { result } = renderHook(() => useMediaQuery('mobile'));

    expect(result.current).toBe(true);
    expect(useTheme).toHaveBeenCalled();
  });

  it('should throw error for invalid query key', () => {
    expect(() => renderHook(() => useMediaQuery('invalidKey' as any))).toThrow(
      'Invalid queryKey: invalidKey'
    );
  });
});
