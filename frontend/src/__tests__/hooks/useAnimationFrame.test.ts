import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import { useAnimationFrame } from '../../hooks/useAnimationFrame';

jest.useFakeTimers();

describe('useAnimationFrame', () => {
  it('should call callback on each animation frame when running', () => {
    const callback = jest.fn();
    const { rerender } = renderHook(
      ({ isRunning }) => useAnimationFrame(isRunning, callback),
      {
        initialProps: { isRunning: true },
      }
    );

    jest.advanceTimersByTime(100); // 100ms進める

    expect(callback).toHaveBeenCalled();
    rerender({ isRunning: false });
  });

  it('should stop calling callback when not running', () => {
    const callback = jest.fn();
    const { rerender } = renderHook(
      ({ isRunning }) => useAnimationFrame(isRunning, callback),
      {
        initialProps: { isRunning: true },
      }
    );

    rerender({ isRunning: false });

    jest.advanceTimersByTime(100); // 100ms進める

    expect(callback).not.toHaveBeenCalled();
  });
});
