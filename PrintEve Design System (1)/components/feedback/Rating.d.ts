import * as React from "react";

export interface RatingProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Rating out of `max`. @default 5 */
  value?: number;
  /** @default 5 */
  max?: number;
  /** Show the numeric value beside the stars. @default true */
  showValue?: boolean;
  /** Review count rendered in parentheses. */
  count?: number;
}

/** Star rating display in the brand's green-gold star colour. */
export declare function Rating(props: RatingProps): JSX.Element;
