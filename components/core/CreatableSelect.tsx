import React, { memo, useCallback, useState } from "react";
import { v4 as uid } from "uuid";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Plus, Trash, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import PopoverComp from "./PopoverComp";
import { RgbaColor, RgbaColorPicker } from "react-colorful";

type CreatanbleSelectValueType = {
  id: string;
  title: string;
  isEditing?: boolean;
  color: string;
  textColor: string;
};

type DataType = {
  [key: string]: CreatanbleSelectValueType;
};

type CreatableSelectProps = {
  data: DataType;
  setData: React.Dispatch<React.SetStateAction<DataType>>;
  name: string;
};

export function cleanCreatableSelectPayload(data: DataType) {
  return Object.values(data).reduce((acc: DataType, ite) => {
    const { isEditing, ...rest } = ite as CreatanbleSelectValueType;
    acc[ite.id] = rest;
    return acc;
  }, {});
}

const CreatableSelect = ({ data, setData, name }: CreatableSelectProps) => {
  const handleUpdate = useCallback(
    ({ id, key, value }: { key: string; value: any; id: string }) => {
      setData((ps) => ({
        ...ps,
        [id]: { ...ps[id], [key]: value },
      }));
    },
    []
  );

  return (
    <div
      key={name}
      className={cn(
        "flex flex-row gap-4 justify-start items-baseline",
        "animate-fadeIn flex-wrap"
      )}
    >
      {Object.entries(data).map(([pulseID, value]) => {
        return (
          <div key={pulseID} className="flex flex-col gap-2 justify-start">
            <div className="flex flex-row gap-2">
              {value.isEditing === true ? (
                <Input
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUpdate({
                        id: pulseID,
                        key: "isEditing",
                        value: false,
                      });
                    }
                  }}
                  className="w-32"
                  key={pulseID}
                  value={value.title}
                  ref={(e) => {
                    e?.focus();
                  }}
                  onChange={(e) => {
                    handleUpdate({
                      id: pulseID,
                      key: "title",
                      value: e.target.value,
                    });
                  }}
                  onBlur={() => {
                    handleUpdate({
                      id: pulseID,
                      key: "isEditing",
                      value: false,
                    });
                  }}
                />
              ) : (
                <Button
                  style={{ backgroundColor: value.color }}
                  key={pulseID}
                  type="button"
                  className="w-32 px-2"
                  onClick={() => {
                    handleUpdate({
                      id: pulseID,
                      key: "isEditing",
                      value: true,
                    });
                  }}
                >
                  <h1
                    className="text-ellipsis overflow-hidden rounded-sm"
                    style={{ color: value.textColor }}
                  >
                    {value.title}
                  </h1>
                </Button>
              )}
              <Button
                variant={"ghost"}
                className="px-0"
                onClick={() => {
                  setData((ps) => {
                    const { [pulseID]: pid, ...rest } = ps;
                    return rest;
                  });
                }}
              >
                <Trash2 color="red" />
              </Button>
            </div>

            <PreviewColor
              label={"Text color"}
              valueKey={"textColor"}
              value={value}
              onChange={(e: RgbaColor) => {
                handleUpdate({
                  id: pulseID,
                  key: "textColor",
                  value: rgbaToString(e),
                });
              }}
            />
            {/* {BACKGROUND} */}

            <PreviewColor
              label={"Background"}
              valueKey={"color"}
              value={value}
              onChange={(e: RgbaColor) => {
                handleUpdate({
                  id: pulseID,
                  key: "color",
                  value: rgbaToString(e),
                });
              }}
            />
          </div>
        );
      })}
      <Button
        onClick={() => {
          const id = uid().slice(0, 12);
          setData((ps) => ({
            ...ps,
            [id]: {
              id,
              color: "rgba(13,42,92,1)",
              title: "Edit Label",
              isEditing: false,
              textColor: "rgba(223,234,242,1)",
            },
          }));
        }}
        type="button"
        className={cn("flex flex-row justify-start", "items-center gap-4")}
      >
        <h2>Add Item</h2>
        <Plus />
      </Button>
    </div>
  );
};

function convertToRgba(color = "") {
  color = color.replace("rgba(", "");
  color = color.replace(")", "");

  const [r, g, b, a] = color.split(",");
  return { r: +r, g: +g, b: +b, a: +a };
}

function rgbaToString({
  r,
  g,
  b,
  a,
}: {
  r: number;
  g: number;
  b: number;
  a: number;
}) {
  return `rgba(${r},${g},${b},${a})`;
}

type PreviewColorProps = {
  value: CreatanbleSelectValueType;
  onChange: (e: RgbaColor) => void;
  valueKey: "color" | "textColor";
  label: string;
};

const PreviewColor = ({
  value,
  onChange,
  valueKey,
  label,
}: PreviewColorProps) => {
  return (
    <div className="color-text-cont grid grid-cols-[50%_30%_20%]">
      <h1 className="text-xs w-9/12 text-nowrap opacity-70">{label}</h1>
      <PopoverComp
        classNames={{
          content: "w-fit m-0 p-0 rounded-lg overflow-hidden",
        }}
        content={
          <RgbaColorPicker
            color={convertToRgba(value[valueKey])}
            onChange={onChange}
          />
        }
        trigger={
          <div
            className="h-4 border-[1px] w-full border-main-light rounded-sm"
            style={{ backgroundColor: value[valueKey] }}
          />
        }
      />
      <div className=""></div>
    </div>
  );
};

export default memo(CreatableSelect);
