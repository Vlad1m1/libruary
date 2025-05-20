import { useCallback, useEffect, useRef } from "react";

function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
): (...args: Parameters<T>) => void {
  const lastExecuted = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const throttledFunction = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      const timeSinceLastExecution = now - lastExecuted.current;

      const execute = () => {
        lastExecuted.current = now;
        callback(...args);
      };

      if (timeSinceLastExecution >= delay) {
        execute();
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(
          execute,
          delay - timeSinceLastExecution,
        );
      }
    },
    [callback, delay],
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return throttledFunction;
}

export default useThrottle;
