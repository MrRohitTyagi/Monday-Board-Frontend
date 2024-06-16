import useClickScroll from "@/hooks/useClickScroll";
import React, { memo } from "react";

type ScrollWrapperProps = { children: React.ReactNode; className: string };

const ScrollWrapper = ({ children, className }: ScrollWrapperProps) => {
  const { handleMouseDown, handleMouseMove, handleMouseUp, ref } =
    useClickScroll();

  return (
    <div
      ref={ref}
      className={className}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
    >
      {children}
    </div>
  );
};

export default memo(ScrollWrapper);
