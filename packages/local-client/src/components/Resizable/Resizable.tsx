import { FC, ReactNode, useEffect, useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./Resizable.css";

interface IResizableProps {
  direction: "horizontal" | "vertical";
  children?: ReactNode;
}

const Resizable: FC<IResizableProps> = ({ children, direction }) => {
  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);
  const [initWidth, setInitWidth] = useState(
    Math.trunc(window.innerWidth * 0.75)
  );
  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        if (Math.round(window.innerWidth * 0.75) < initWidth) {
          setInitWidth(Math.trunc(window.innerWidth * 0.75));
        }
      }, 150);
    };
    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [initWidth]);
  let resizableProps: ResizableBoxProps;
  if (direction === "horizontal") {
    resizableProps = {
      className: "resize-horizontal",
      width: initWidth,
      height: Infinity,
      resizeHandles: ["e"],
      maxConstraints: [Math.trunc(width * 0.75), Infinity],
      minConstraints: [Math.trunc(width * 0.2), Infinity],
      onResizeStop: (event, data) => {
        setInitWidth(data.size.width);
      },
    };
  } else {
    resizableProps = {
      width: Infinity,
      height: 250,
      resizeHandles: ["s"],
      maxConstraints: [Infinity, Math.trunc(height * 1.3)],
      minConstraints: [Infinity, 24],
    };
  }
  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
