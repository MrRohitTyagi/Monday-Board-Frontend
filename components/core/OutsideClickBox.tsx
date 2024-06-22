import React, { useRef, useEffect } from "react";

import { ChildrenType } from "@/types/genericTypes";

type OutsideClickBoxProps = {
  onOutsideClick: () => void;
  className?: string;
} & ChildrenType;

const OutsideClickBox = ({
  children,
  onOutsideClick,
  className,
}: OutsideClickBoxProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        onOutsideClick();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onOutsideClick]);

  return (
    <div ref={wrapperRef} className={className}>
      {children}
    </div>
  );
};

export default OutsideClickBox;
