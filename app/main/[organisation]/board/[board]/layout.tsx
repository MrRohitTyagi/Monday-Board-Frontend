"use client";

import React, { useCallback, useState } from "react";
import { PulseChatContext } from "@/hooks/usePulseChat";
import PulseChat from "@/pages/PageChat";
import { PulseType } from "@/zstore";

type layoutProps = {
  children: React.ReactNode;
};
const layout = ({ children }: layoutProps) => {
  const [pulseChatLayer, setPulseChatLayer] = useState({
    isOpen: false,
    pulse: {} as PulseType,
  });

  const openPulseChatLayer = useCallback((pulse: PulseType) => {
    setPulseChatLayer({ isOpen: true, pulse });
  }, []);

  const closePulseChatLayer = useCallback(() => {
    setPulseChatLayer({ isOpen: false, pulse: {} as PulseType });
  }, []);

  return (
    <>
      <PulseChatContext.Provider
        value={{ openPulseChatLayer, closePulseChatLayer }}
      >
        {children}
      </PulseChatContext.Provider>
      {pulseChatLayer.isOpen && <PulseChat pulse={pulseChatLayer.pulse} />}
    </>
  );
};

export default layout;
