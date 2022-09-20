import React from "react";
export interface DottedProps {
  color?: string;
  size?: "small" | "medium" | "large";
  style?: React.CSSProperties;
  text?: string | boolean;
  textColor?: string;
}