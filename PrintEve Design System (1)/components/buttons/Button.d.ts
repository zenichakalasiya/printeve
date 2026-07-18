import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. @default "primary" */
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link" | "danger";
  /** Control height & padding. @default "md" */
  size?: "sm" | "md" | "lg" | "icon";
  /** Stretch to full container width. */
  fullWidth?: boolean;
  /** Icon element rendered before the label. */
  leftIcon?: React.ReactNode;
  /** Icon element rendered after the label. */
  rightIcon?: React.ReactNode;
  /** Render as a different element/component (e.g. "a"). @default "button" */
  as?: React.ElementType;
}

/**
 * The primary call-to-action control across PrintEve. Green-filled by default;
 * `secondary` is the soft-green tonal style, `outline`/`ghost` for lower emphasis.
 *
 * @startingPoint section="Buttons" subtitle="Primary, secondary, outline & ghost actions" viewport="700x200"
 */
export declare function Button(props: ButtonProps): JSX.Element;
