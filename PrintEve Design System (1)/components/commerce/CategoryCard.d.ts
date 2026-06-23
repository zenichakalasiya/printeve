import * as React from "react";

export interface CategoryCardProps extends React.HTMLAttributes<HTMLElement> {
  /** Category name. */
  name: string;
  /** One-line description. */
  description?: string;
  /** URL to a brand illustration SVG (preferred). */
  iconSrc?: string;
  /** Or an inline icon node. */
  icon?: React.ReactNode;
  /** Link target when rendered as an anchor. */
  href?: string;
  /** Element to render. @default "a" */
  as?: React.ElementType;
}

/**
 * Lift-on-hover product-category tile using a PrintEve illustration on a soft-green chip.
 *
 * @startingPoint section="Commerce" subtitle="Product category tile with illustration" viewport="320x180"
 */
export declare function CategoryCard(props: CategoryCardProps): JSX.Element;
