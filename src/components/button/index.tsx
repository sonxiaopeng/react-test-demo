import React from "react";
import useTimeout from "./hooks/useTimeout";

type ButtonProps = {
  children?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  size?: string;
  onClick?: () => void;
  timeout?: number;
};

const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  disabled,
  onClick,
  size,
  timeout,
}) => {
  const { text } = useTimeout(timeout);

  if (size === "large") {
    console.warn("Dont be so large");
  }

  return (
    <button disabled={disabled} onClick={onClick}>
      <span>{loading ? "loading" : ""}</span>
      <span>{children || "blank"}</span>
      <span>{text}</span>
    </button>
  );
};

export default Button;
