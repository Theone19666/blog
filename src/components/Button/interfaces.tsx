export interface IButton {
  variant?: "text" | "outlined" | "contained" | undefined;
  size?: "small" | "medium" | "large" | undefined;
  classNames?: string;
  text: string;
  color?: "inherit" | "primary" | "secondary" | "default" | undefined;
  rootClassName?: string;
  onClick?: () => void;
}
