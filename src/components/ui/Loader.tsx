import clsx from "clsx";
import { CSSProperties } from "react";

export default function Loader({
  fullScreen,
  ...rest
}: {
  fullScreen?: boolean;
}) {
  return (
    <div className="m-5 flex justify-center">
      <span className="loading loading-ring loading-lg"></span>
    </div>
  );
}
