import { useCallback, useEffect, useRef } from 'react';

export const useAnimationFrame = (isRunning: boolean, callback: () => void) => {
  const reqIdRef = useRef<number | null>(null);

  const loop = useCallback(() => {
    if (isRunning) {
      reqIdRef.current = requestAnimationFrame(loop);
      callback();
    }
  }, [isRunning, callback]);

  useEffect(() => {
    if (isRunning) {
      reqIdRef.current = requestAnimationFrame(loop);
    }
    return () => {
      if (reqIdRef.current !== null) {
        cancelAnimationFrame(reqIdRef.current);
      }
    };
  }, [loop]);
};
