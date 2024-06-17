"use client";

import ResizableSplit from "@/components/core/ResizableSplit";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type layoutProps = {
  params: { pulse_id: string };
};
const layout = ({ params }: layoutProps) => {
  const router = useRouter();
  // const params = useParams();

  console.log(`%c params `, "color: orange;border:2px solid cyan", params);

  return (
    <div className="fixed right-0 top-0 left-0 bottom-0">
      <ResizableSplit childMode={true} id={params.pulse_id}>
        <div className="w-full h-full bg-main-fg">
          <div className="header">
            <Button onClick={() => router.back()}>
              <X />
            </Button>
          </div>
        </div>
      </ResizableSplit>
    </div>
  );
};

export default layout;
