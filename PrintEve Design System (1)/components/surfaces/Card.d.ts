import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Lift + green border on hover. */
  hoverable?: boolean;
  /** Remove the shadow. */
  flat?: boolean;
  /** Apply uniform inner padding (skip Card sub-parts). */
  padded?: boolean;
}
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: React.ReactNode;
  description?: React.ReactNode;
}

/** Rounded surface container (12px radius, soft shadow). */
export declare function Card(props: CardProps): JSX.Element;
/** Header region with optional title + description. */
export declare function CardHeader(props: CardHeaderProps): JSX.Element;
/** Main content region with standard padding. */
export declare function CardBody(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
/** Footer region (flex row) for actions. */
export declare function CardFooter(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
