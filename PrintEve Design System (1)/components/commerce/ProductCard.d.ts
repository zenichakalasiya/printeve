import * as React from "react";

export interface ProductCardProps extends React.HTMLAttributes<HTMLElement> {
  /** Product name. */
  name: string;
  /** Display price string, e.g. "₹499". */
  price: React.ReactNode;
  /** Product image URL. */
  imageSrc?: string;
  /** Or an inline image/illustration node. */
  image?: React.ReactNode;
  /** Star rating value. */
  rating?: number;
  /** Review count shown beside the rating. */
  reviews?: number;
  /** Corner badge label, e.g. "Bestseller". */
  badge?: string;
  /** Link target. */
  href?: string;
  /** @default "a" */
  as?: React.ElementType;
}

/**
 * Featured-product showcase card — image, price, rating, corner badge and a
 * hover-revealed "View" CTA.
 *
 * @startingPoint section="Commerce" subtitle="Product showcase card with price & rating" viewport="300x340"
 */
export declare function ProductCard(props: ProductCardProps): JSX.Element;
