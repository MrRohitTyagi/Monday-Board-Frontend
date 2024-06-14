import React, {
  useCallback,
  useRef,
  useState,
  MouseEvent as ReactMouseEvent,
} from "react";

const useClickScroll = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dragState, setDragState] = useState({
    isDragging: false,
    startX: 0,
    scrollLeft: 0,
  });

  const handleMouseDown = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const { offsetLeft, scrollLeft } = containerRef.current;
    const startX = e.pageX - offsetLeft;

    setDragState((prevState) => ({
      ...prevState,
      isDragging: true,
      startX: startX,
      scrollLeft: scrollLeft,
    }));
  }, []);

  const handleMouseUp = useCallback(() => {
    setDragState((prevState) => ({
      ...prevState,
      isDragging: false,
    }));
  }, []);

  const handleMouseMove = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      if (!dragState.isDragging || !containerRef.current) return;

      const { offsetLeft } = containerRef.current;
      const x = e.pageX - offsetLeft;
      const walk = (x - dragState.startX) * 2;

      containerRef.current.scrollLeft = dragState.scrollLeft - walk;
    },
    [dragState]
  );

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    ref: containerRef,
  };
};

export default useClickScroll;
