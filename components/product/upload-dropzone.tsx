"use client";

import * as React from "react";
import {
  UploadCloud,
  FileText,
  Trash2,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { GuidelinesSheet } from "@/components/product/guidelines-sheet";

const ACCEPTED = [".pdf", ".ai", ".psd", ".png", ".jpg", ".jpeg"];

type UploadedFile = { id: string; name: string; size: number };

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isAccepted(name: string) {
  const lower = name.toLowerCase();
  return ACCEPTED.some((ext) => lower.endsWith(ext));
}

export function UploadDropzone() {
  const [files, setFiles] = React.useState<UploadedFile[]>([]);
  const [dragging, setDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  function addFiles(list: FileList | null) {
    if (!list) return;
    const incoming = Array.from(list);
    const valid = incoming.filter((f) => isAccepted(f.name));
    const rejected = incoming.length - valid.length;
    if (rejected > 0) {
      toast.error(
        `${rejected} file${rejected > 1 ? "s" : ""} skipped — accepted types: PDF, AI, PSD, PNG, JPG.`
      );
    }
    if (valid.length) {
      setFiles((prev) => [
        ...prev,
        ...valid.map((f, i) => ({
          id: `${f.name}-${f.size}-${prev.length + i}`,
          name: f.name,
          size: f.size,
        })),
      ]);
      toast.success("File added — preview only, nothing is uploaded yet.");
    }
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  }

  function removeFile(id: string) {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Upload your design</span>
        <GuidelinesSheet />
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={cn(
          "rounded-xl border border-dashed p-5 transition-colors",
          dragging ? "border-brand bg-brand/5" : "border-border bg-muted/30"
        )}
      >
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full flex-col items-center gap-2 text-center"
        >
          <span className="bg-primary/10 text-brand flex size-12 items-center justify-center rounded-full">
            <UploadCloud className="size-6" />
          </span>
          <span className="text-sm font-medium">
            Drag & drop your file here, or{" "}
            <span className="text-brand">browse</span>
          </span>
          <span className="text-muted-foreground text-xs">
            Up to 3GB per file
          </span>
        </button>

        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPTED.join(",")}
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />

        {/* File-type badges */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
          <Badge className="gap-1">
            PDF <span className="opacity-80">· preferred</span>
          </Badge>
          <Badge variant="secondary">AI</Badge>
          <Badge variant="secondary">PSD</Badge>
          <Badge variant="outline">PNG</Badge>
          <Badge variant="outline">JPG</Badge>
        </div>

        {/* Uploaded file cards */}
        {files.length > 0 && (
          <ul className="mt-4 flex flex-col gap-2">
            {files.map((f) => (
              <li
                key={f.id}
                className="bg-background flex items-center gap-3 rounded-lg border p-3"
              >
                <span className="bg-muted text-foreground flex size-9 shrink-0 items-center justify-center rounded-md">
                  <FileText className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{f.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {formatSize(f.size)}
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-chart-2/15 text-chart-2 gap-1 border-transparent"
                >
                  <CheckCircle2 className="size-3" /> Ready to Print
                </Badge>
                <button
                  type="button"
                  onClick={() => removeFile(f.id)}
                  aria-label={`Remove ${f.name}`}
                  className="text-muted-foreground hover:text-destructive flex size-8 items-center justify-center rounded-md transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Single-design policy */}
      <p className="text-muted-foreground flex items-start gap-2 text-xs">
        <AlertTriangle className="text-brand mt-0.5 size-3.5 shrink-0" />
        <span>
          <span className="text-foreground font-medium">
            Single Design Policy:
          </span>{" "}
          Please upload one design file containing front and back sides, or
          compile into a single ZIP.
        </span>
      </p>

      <button
        type="button"
        onClick={() =>
          toast.info("Template customiser is coming soon — stay tuned!")
        }
        className="text-brand hover:text-brand/80 self-start text-sm font-medium"
      >
        Don&apos;t have a design? Customize our templates →
      </button>
    </div>
  );
}
