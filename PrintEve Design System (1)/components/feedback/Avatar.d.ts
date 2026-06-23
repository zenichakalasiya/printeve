import * as React from "react";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Image URL; falls back to initials when absent. */
  src?: string;
  /** Full name — used for initials and the title attribute. */
  name?: string;
  /** @default "md" */
  size?: "sm" | "md" | "lg";
}

/** Circular avatar showing a photo or initials on a soft-green chip. */
export declare function Avatar(props: AvatarProps): JSX.Element;
