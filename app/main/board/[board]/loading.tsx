import Loader from "@/components/core/Loader";
import React from "react";
type lodingProps = {};
const loding = (props: lodingProps) => {
  return (
    <div className="h-full w-full w-row justify-center">
      <Loader />
    </div>
  );
};

export default loding;
