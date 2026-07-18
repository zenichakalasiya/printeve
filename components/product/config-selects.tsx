"use client";

import type { ConfigOption } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ConfigSelects({
  options,
  value,
  onChange,
}: {
  options: ConfigOption[];
  value: Record<string, string>;
  onChange: (key: string, optionName: string) => void;
}) {
  if (options.length === 0) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {options.map((option) => (
        <div key={option.key} className="flex flex-col gap-2">
          <Label htmlFor={`opt-${option.key}`}>{option.label}</Label>
          <Select
            value={value[option.key]}
            onValueChange={(v) => onChange(option.key, v)}
          >
            <SelectTrigger id={`opt-${option.key}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {option.values.map((v) => (
                <SelectItem key={v.name} value={v.name}>
                  <span className="flex w-full items-center justify-between gap-3">
                    <span>{v.name}</span>
                    {v.surcharge > 0 && (
                      <span className="text-muted-foreground text-xs">
                        +{formatPrice(v.surcharge)}
                      </span>
                    )}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  );
}
