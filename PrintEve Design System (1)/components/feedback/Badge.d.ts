import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default "default" */
  variant?: "default" | "primary" | "secondary" | "accent" | "success" | "danger" | "warning" | "outline";
  /** Show a leading status dot. */
  dot?: boolean;
}

/** Compact pill for statuses, categories and metadata. */
export declare function Badge(props: BadgeProps): JSX.Element;
