import React, { memo } from "react";
type SpaceProps = { h?: number };
const Space = ({ h = 2 }: SpaceProps) => {
  return <div className={`h-${h} height-component`} />;
};

export default memo(Space);
