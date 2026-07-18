import * as React from "react";

export interface AccordionItemData {
  question: React.ReactNode;
  answer: React.ReactNode;
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Items to render, each { question, answer }. */
  items: AccordionItemData[];
  /** Index open on mount; -1 for all closed. @default 0 */
  defaultOpen?: number;
}

/** Single-expand FAQ accordion with an animated chevron. */
export declare function Accordion(props: AccordionProps): JSX.Element;
