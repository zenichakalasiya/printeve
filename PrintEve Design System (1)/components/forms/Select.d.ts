import * as React from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  /** Options as strings or {value,label} objects. */
  options?: Array<string | SelectOption>;
  /** Disabled placeholder option shown first. */
  placeholder?: string;
}

/** Native select restyled with PrintEve chrome and a custom chevron. */
export declare function Select(props: SelectProps): JSX.Element;
