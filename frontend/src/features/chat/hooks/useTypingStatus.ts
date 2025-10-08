import { useCallback, useEffect, useRef, useState } from "react";

const TYPING_TIMEOUT = 1500;

const useTypingStatus = ({ onStartTyping, onStopTyping }: { onStartTyping: () => void; onStopTyping: () => void }) => {
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const stopTyping = useCallback(() => {
    setIsTyping(false);
    onStopTyping();
  }, [onStopTyping]);

  const startTyping = useCallback(() => {
    if (!isTyping) {
      setIsTyping(true);
      onStartTyping();
    }

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      stopTyping();
    }, TYPING_TIMEOUT);
  }, [isTyping, onStartTyping, stopTyping]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    onKeyDown: startTyping,
    isTyping,
    stopTyping,
  };
};
export default useTypingStatus;
