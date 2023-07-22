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
    </button>
  );
};

export default FAButton;
