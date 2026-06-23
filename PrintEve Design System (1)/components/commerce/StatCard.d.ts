import * as React from "react";

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Headline figure, e.g. "10,000+". */
  value: React.ReactNode;
  /** Supporting label, e.g. "Orders delivered". */
  label: string;
  /** Optional leading icon. */
  icon?: React.ReactNode;
}

/** Trust-statistic card: large numeral over a muted label. */
export declare function StatCard(props: StatCardProps): JSX.Element;
