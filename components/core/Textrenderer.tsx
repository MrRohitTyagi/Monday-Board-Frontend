import { memo } from "react";

const BodyRenderer = ({ str = "" }: { str: string }) => {
  const stringWithBreaks = str.split("\n");
  return (
    <>
      {stringWithBreaks.map((l = "") => {
        return (
          <>
            {l} <br />
          </>
        );
      })}
    </>
  );
};
export default memo(BodyRenderer);
