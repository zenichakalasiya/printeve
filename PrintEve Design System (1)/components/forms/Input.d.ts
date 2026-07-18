import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Field label rendered above the control. */
  label?: string;
  /** Helper text shown below the field. */
  hint?: string;
  /** Error message; replaces hint and switches the field to the error style. */
  error?: string;
  /** Show a required asterisk on the label. */
  required?: boolean;
  /** Leading icon element rendered inside the field. */
  icon?: React.ReactNode;
}

/**
 * Single-line text field with label, leading icon, hint and error states.
 * Focus shows a soft-green ring; errors switch to the danger hue.
 */
export declare function Input(props: InputProps): JSX.Element;
