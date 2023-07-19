import { FC, ReactNode } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./Resizable.css";

interface IResizableProps {
  direction: "horizontal" | "vertical";
  children?: ReactNode;
}

const Resizable: FC<IResizableProps> = ({ children, direction }) => {
  let resizableProps: ResizableBoxProps;
  if (direction === "horizontal") {
    resizableProps = {
      className: "resize-horizontal",
      width: window.innerWidth * 0.75,
      height: Infinity,
      resizeHandles: ["e"],
      maxConstraints: [Math.trunc(window.innerWidth * 0.75), Infinity],
      minConstraints: [Math.trunc(window.innerWidth * 0.2), Infinity],
    };
  } else {
    resizableProps = {
      width: Infinity,
      height: 250,
      resizeHandles: ["s"],
      maxConstraints: [Infinity, window.innerHeight * 0.9],
      minConstraints: [Infinity, 24],
    };
  }
  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
