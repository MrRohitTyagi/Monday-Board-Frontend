import React from "react";
type SpaceProps = { h?: number };
const Space = ({ h = 2 }: SpaceProps) => {
  return <div className={`h-${h}`} />;
};

export default Space;
