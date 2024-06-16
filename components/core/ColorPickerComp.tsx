import React, { useState } from "react";
import { SketchPicker, CirclePicker, SwatchesPicker } from "react-color";

type ColorPickerCompProps = {
  color: string;
  onChange: (hex: string) => void;
  pickerType: "swatches" | "circle" | "sketch";
};

const ColorPickerComp = ({
  color,
  onChange,
  pickerType,
}: ColorPickerCompProps) => {
  switch (pickerType) {
    case "swatches":
      return (
        <SwatchesPicker
          height={150}
          styles={{
            default: {
              body: {},
              picker: { boxShadow: "none",
                //  backgroundColor: "transparent" 
                },
            },
          }}
          color={color}
          onChange={({ hex }) => {
            onChange(hex);
          }}
        />
      );
    case "circle":
      return (
        <CirclePicker
          color={color}
          onChange={({ hex }) => {
            onChange(hex);
          }}
        />
      );
    case "sketch":
      return (
        <SketchPicker
          color={color}
          onChange={({ hex }) => {
            onChange(hex);
          }}
        />
      );

    default:
      break;
  }
};

export default ColorPickerComp;
