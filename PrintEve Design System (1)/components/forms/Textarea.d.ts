import * as React from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
}

/** Multi-line text field sharing the Input field styling. */
export declare function Textarea(props: TextareaProps): JSX.Element;
