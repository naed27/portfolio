import { useCallback, useRef, useState, TouchEvent } from "react";

interface Props {
  delay?: number;
  onClick?: () => any;
  onLongPress?: (event: TouchEvent) => any;
  shouldPreventDefault?: boolean;
}

const useLongPress = ({
  delay = 300,
  onClick = () => {},
  onLongPress = () => {},
  shouldPreventDefault = true,
}: Props) => {

  const target = useRef<EventTarget | null>(null);
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const [longPressTriggered, setLongPressTriggered] = useState(false);

  const start = useCallback(
    (event: TouchEvent) => {
      if (shouldPreventDefault && event.target) {
        event.target.addEventListener(
          "touchend",
          preventDefault,
          { passive: false, }
        );
        target.current = event.target;
      }
      timeout.current = setTimeout(() => {
        onLongPress(event);
        setLongPressTriggered(true);
      }, delay);
    },
    [onLongPress, delay, shouldPreventDefault]
  );

  const clear = useCallback(
    (event: TouchEvent, shouldTriggerClick: boolean = true) => {
      timeout.current && clearTimeout(timeout.current);
      shouldTriggerClick && !longPressTriggered && onClick();
      setLongPressTriggered(false);
      if (shouldPreventDefault && target.current) {
        target.current.removeEventListener("touchend", preventDefault);
      }
    },
    [shouldPreventDefault, onClick, longPressTriggered]
  );

  return {
    onMouseDown: (e: TouchEvent) => start(e),
    onTouchStart: (e: TouchEvent) => start(e),
    onMouseUp: (e: TouchEvent) => clear(e),
    onMouseLeave: (e: TouchEvent) => clear(e, false),
    onTouchEnd: (e: TouchEvent) => clear(e),
  };
};

const isTouchEvent = (event: TouchEvent) => {
  return "touches" in event;
};

const preventDefault = (event: Event | TouchEvent) => {
  const touchEvent = event as TouchEvent;
  if (!isTouchEvent(touchEvent)) return;

  if (touchEvent.touches.length < 2 && touchEvent.preventDefault) {
    touchEvent.preventDefault();
  }
};

export default useLongPress;