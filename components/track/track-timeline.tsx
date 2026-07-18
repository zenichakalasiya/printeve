"use client";

import * as React from "react";
import { TimelineEvent, OrderStatus } from "@/lib/data/orders";
import { CheckCircle2, Circle, Loader2, AlertCircle, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrackTimelineProps {
  timeline: TimelineEvent[];
  currentStatus: OrderStatus;
  holdReason?: string;
}

export function TrackTimeline({ timeline, currentStatus, holdReason }: TrackTimelineProps) {
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);

  // Toggle expansion of detail notes
  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const getStepIcon = (event: TimelineEvent, index: number, isLast: boolean) => {
    // If it's a HOLD event and it's active
    if (event.status === "HOLD" && !event.isCompleted) {
      return (
        <div className="bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 relative z-10 flex size-9 items-center justify-center rounded-full border-2 border-red-500 shadow-sm animate-pulse">
          <AlertCircle className="size-5 shrink-0" />
        </div>
      );
    }
    
    if (event.status === "HOLD" && event.isCompleted) {
      return (
        <div className="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 relative z-10 flex size-9 items-center justify-center rounded-full border-2 border-emerald-500 shadow-sm">
          <CheckCircle2 className="size-5 shrink-0" />
        </div>
      );
    }

    // Active state: The first non-completed step, or if it is the current status
    const isCurrent = event.status === currentStatus && !event.isCompleted;
    // Determine if it is the current active step in the flow
    const isActive = (index === 0 && !event.isCompleted) || 
                     (timeline[index - 1]?.isCompleted && !event.isCompleted);

    if (event.isCompleted) {
      return (
        <div className="bg-primary/10 text-primary dark:bg-primary/20 relative z-10 flex size-9 items-center justify-center rounded-full border-2 border-primary shadow-xs">
          <CheckCircle2 className="size-5 shrink-0" />
        </div>
      );
    }

    if (isActive || isCurrent) {
      return (
        <div className="bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 relative z-10 flex size-9 items-center justify-center rounded-full border-2 border-amber-500 shadow-sm">
          <Loader2 className="size-5 shrink-0 animate-spin" />
        </div>
      );
    }

    return (
      <div className="bg-card text-muted-foreground relative z-10 flex size-9 items-center justify-center rounded-full border-2 border-border shadow-xs">
        <Circle className="size-3.5 fill-muted-foreground/20" />
      </div>
    );
  };

  const formatEventDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      });
    } catch {
      return "";
    }
  };

  return (
    <div className="bg-card border-border rounded-xl border p-6 shadow-xs">
      <h3 className="font-serif text-lg font-bold tracking-tight mb-6 flex items-center gap-2">
        <Clock className="size-4.5 text-muted-foreground" />
        Printing & Delivery Timeline
      </h3>

      <div className="relative pl-6 flex flex-col gap-8">
        {/* The line connecting the steps */}
        <div className="absolute top-2.5 left-[16.5px] bottom-2.5 w-0.5 bg-border dark:bg-border/60 z-0" />

        {timeline.map((event, index) => {
          const isLast = index === timeline.length - 1;
          const isHold = event.status === "HOLD";
          const isActive = (index === 0 && !event.isCompleted) || 
                           (timeline[index - 1]?.isCompleted && !event.isCompleted);
          const isExpanded = expandedIndex === index;

          return (
            <div
              key={index}
              className={cn(
                "relative flex items-start gap-4 transition-all group",
                event.isCompleted ? "opacity-100" : "opacity-80"
              )}
            >
              {/* Step Icon */}
              <div className="absolute -left-[24.5px]">
                {getStepIcon(event, index, isLast)}
              </div>

              {/* Step Content */}
              <div className="flex-1 min-w-0 bg-muted/20 hover:bg-muted/40 rounded-lg border border-transparent hover:border-border p-3 -mt-1 cursor-pointer transition-all"
                   onClick={() => toggleExpand(index)}>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-col gap-0.5">
                    <span
                      className={cn(
                        "text-sm font-semibold transition-colors",
                        event.isCompleted ? "text-foreground font-medium" : "text-muted-foreground",
                        isHold && !event.isCompleted && "text-destructive font-bold",
                        (isActive || event.status === currentStatus) && !event.isCompleted && "text-amber-700 dark:text-amber-400 font-bold"
                      )}
                    >
                      {event.label}
                    </span>
                    <span className="text-muted-foreground font-mono text-[11px]">
                      {event.isCompleted ? formatEventDate(event.date) : "Pending step"}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground">
                    {isExpanded ? (
                      <ChevronUp className="size-4 opacity-70 group-hover:opacity-100" />
                    ) : (
                      <ChevronDown className="size-4 opacity-70 group-hover:opacity-100" />
                    )}
                  </div>
                </div>

                {/* Expanded Details panel */}
                {isExpanded && (
                  <div className="mt-3 text-xs leading-relaxed text-muted-foreground border-t pt-2.5 animate-fadeIn">
                    <p className="font-normal">{event.description}</p>
                    {isHold && holdReason && (
                      <div className="bg-destructive/10 text-destructive rounded-md p-2.5 mt-2 font-medium">
                        🚨 Error Detail: {holdReason}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
