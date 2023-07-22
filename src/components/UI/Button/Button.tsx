import { FC, ReactNode } from "react";

interface IButtonProps {
  children?: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  className?: string;
  spanClass?: string;
  iconClass?: string;
  onClick: () => void;
}
const FAButton: FC<IButtonProps> = ({
  type,
  spanClass,
  iconClass,
  children,
  className,
  onClick,
}) => {
  return (
    <button type={type} className={className || ""} onClick={() => onClick()}>
      <span className={spanClass}>
        <i className={iconClass}></i>
      </span>
      {children ? (
        <span style={{ fontSize: "0.8rem" }}> {children}</span>
      ) : null}
    </button>
  );
};

export default FAButton;
