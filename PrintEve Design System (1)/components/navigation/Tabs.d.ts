import * as React from "react";

export interface TabItem {
  label: React.ReactNode;
  content: React.ReactNode;
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tabs to render, each { label, content }. */
  tabs: TabItem[];
  /** Active tab on mount. @default 0 */
  defaultIndex?: number;
}

/** Segmented (pill) tabs on a surface track with an elevated active tab. */
export declare function Tabs(props: TabsProps): JSX.Element;
