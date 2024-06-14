import { cn } from "@/lib/utils";
import { PulseType } from "@/zstore";
import { startCase } from "lodash";
import React, {
  DOMAttributes,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { PulseContext } from "../Pulse";

type PulseTitleProps = {
  pulse: PulseType;
};

const PulseTitle = ({ pulse }: PulseTitleProps) => {
  const [isEditable, setIsEditable] = useState(false);
  const { updateTitle } = useContext(PulseContext);

  const handleKey = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "Enter":
        setIsEditable(false);
        break;
      default:
        break;
    }
  }, []);

  return isEditable ? (
    <>
      <input
        onBlur={() => setIsEditable(false)}
        onKeyUp={handleKey}
        ref={(e) => {
          e?.focus();
        }}
        className="w-11/12"
        type="text"
        onChange={(e) => updateTitle(e.target.value)}
        value={pulse.title}
      />
    </>
  ) : (
    <div
      onClick={(e) => {
        setIsEditable(true);
      }}
      className={cn(
        "pulse-title",
        "w-full text-sm opacity-80 content-around",
        "text-ellipsis overflow-hidden text-nowrap"
      )}
    >
      {startCase(pulse.title)}
    </div>
  );
};

export default PulseTitle;
