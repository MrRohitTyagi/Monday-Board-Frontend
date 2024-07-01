import PulseLoader from "@/components/core/PulseLoader";

import React from "react";
type lodingProps = {};
const loding = (props: lodingProps) => {
  return (
    <div className="h-full w-full w-row justify-center">
      <PulseLoader />
    </div>
  );
};

export default loding;
