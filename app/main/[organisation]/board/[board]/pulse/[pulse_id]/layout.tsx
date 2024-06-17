"use client";

import ResizableSplit from "@/components/core/ResizableSplit";
import React from "react";
import { useParams } from "next/navigation";

type layoutProps = {};
const layout = (props: layoutProps) => {
  const params = useParams();
  const src = window.location.origin;

  console.log(`%c src `, "color: orange;border:2px solid cyan", src);

  return (
    <div className="fixed right-0 top-0 left-0 bottom-0">
      <ResizableSplit
        leftPannel={
          <div
            className="resizable-left-side h-full w-full bg-black 
        opacity-50 pointer-events-none"
          />
        }
        rightPannel={<div className="w-full h-full bg-main-fg">gjkdfbjgdf</div>}
      />
    </div>
  );
};

export default layout;
