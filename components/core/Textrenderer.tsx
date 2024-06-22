import { Fragment, memo } from "react";

const BodyRenderer = ({ str = "" }: { str: string }) => {
  const stringWithBreaks = str.split("\n");
  return (
    <>
      {stringWithBreaks.map((l = "", i) => {
        return (
          <Fragment key={l + i}>
            {l} <br />
          </Fragment>
        );
      })}
    </>
  );
};
export default memo(BodyRenderer);
