import React from "react";
import PopoverComp from "@/components/core/PopoverComp";
import Space from "@/components/core/Space";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import useTheme from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { useConfig } from "@/store/configStore";
import { PulseHeightType } from "@/types/configTypes";
import { Settings2 } from "lucide-react";

type MoreSettingsProps = {};

const sizeArray: PulseHeightType[] = ["sm", "md", "lg"];

const MoreSettings = (props: MoreSettingsProps) => {
  const { pulseHeight, setPulseHeight } = useConfig();
  const { applyPulseHeight } = useTheme();
  return (
    <div>
      <PopoverComp
        classNames={{
          trigger: "h-full",
          content:
            "w-fit bg-main-fg p-4 shadow-lg shadow-black border-2 border-highlighter-dark",
        }}
        trigger={
          <Button
            className={cn(
              // baseCssMiniItems(5),
              "rounded-sm border-r-0",
              "border-2 border-highlighter-dark"
            )}
            variant={"ghost"}
          >
            <Settings2 size={20} color="white" />
          </Button>
        }
        content={
          <div className="p-2 bg-main-fg">
            <div className="flex flex-col gap-3">
              <ToggleGroup type="single">
                <h1>Pulse height : </h1>
                <Space h={4} />
                {sizeArray.map((size) => (
                  <ToggleGroupItem
                    variant={"default"}
                    className={cn(
                      "hover:border-2",
                      "transition-all",
                      "border border-highlighter-dark",
                      "w-16",
                      size === pulseHeight && "bg-highlighter-dark"
                    )}
                    key={size}
                    value={size}
                    onClick={() => {
                      setPulseHeight(size);
                      applyPulseHeight(size);
                    }}
                  >
                    <h1>{size.toUpperCase()}</h1>
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </div>
        }
        controlled={true}
      />
    </div>
  );
};

export default MoreSettings;
