"use client";

import * as React from "react";
import { AlertTriangle, UploadCloud, FileText, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateOrderArtwork } from "@/lib/data/orders";

interface ArtworkHoldCardProps {
  orderId: string;
  holdReason: string;
  onUploadSuccess: () => void;
}

export function ArtworkHoldCard({ orderId, holdReason, onUploadSuccess }: ArtworkHoldCardProps) {
  const [dragActive, setDragActive] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [uploading, setUploading] = React.useState(false);
  const [verifying, setVerifying] = React.useState(false);
  const [uploadComplete, setUploadComplete] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      handleFileSelected(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (selectedFile: File) => {
    // Validate format (basic extension check)
    const validExtensions = [".pdf", ".ai", ".psd", ".cdr", ".png", ".jpeg", ".jpg", ".tiff", ".tif"];
    const fileExtension = selectedFile.name.substring(selectedFile.name.lastIndexOf(".")).toLowerCase();
    
    if (!validExtensions.includes(fileExtension)) {
      toast.error("Invalid file format", {
        description: "Please upload a PDF, AI, PSD, CDR or high-res image format.",
      });
      return;
    }

    setFile(selectedFile);
    setUploadComplete(false);
    setUploadProgress(0);
    setUploading(false);
    setVerifying(false);
  };

  const triggerUpload = () => {
    if (!file) return;

    setUploading(true);
    setUploadProgress(5);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          triggerVerification();
          return 100;
        }
        // Increment faster first, then slow down
        const step = prev < 50 ? 15 : prev < 85 ? 8 : 4;
        return Math.min(prev + step, 100);
      });
    }, 150);
  };

  const triggerVerification = () => {
    setVerifying(true);
    
    // Simulate pre-press verification checks
    setTimeout(() => {
      setVerifying(false);
      setUploadComplete(true);
      
      // Mutate the mock database state
      const success = updateOrderArtwork(orderId, file!.name);
      if (success) {
        toast.success("Artwork verified & approved!", {
          description: "Resolution (350 DPI) & dimensions check passed. Sent to Printing.",
        });
        setTimeout(() => {
          onUploadSuccess();
        }, 1000);
      } else {
        toast.error("Failed to update order artwork.");
      }
    }, 1800);
  };

  return (
    <div className="bg-red-50/40 border-red-200 dark:bg-red-950/10 dark:border-red-900/30 rounded-xl border p-6 shadow-xs flex flex-col gap-5">
      <div className="flex items-start gap-4">
        <div className="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 p-2.5 rounded-lg shrink-0">
          <AlertTriangle className="size-6" />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-serif text-lg font-bold text-red-950 dark:text-red-300">
            Action Required: Artwork Flagged
          </h3>
          <p className="text-red-700 dark:text-red-400 text-sm leading-relaxed font-normal">
            Our pre-flight automated scanner or design editor has paused this order. 
            <strong className="block mt-1 font-semibold">Reason: {holdReason}</strong>
          </p>
        </div>
      </div>

      <div className="border-t border-red-200/60 dark:border-red-900/20 pt-4">
        <h4 className="text-sm font-semibold text-foreground mb-3">
          Upload Corrected Design File
        </h4>

        {/* Upload States */}
        {!file && (
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 ${
              dragActive
                ? "border-primary bg-primary/5"
                : "border-red-200 hover:border-primary hover:bg-muted/40 dark:border-red-900/40"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.ai,.psd,.cdr,.png,.jpeg,.jpg,.tiff,.tif"
            />
            <div className="bg-background dark:bg-card p-3 rounded-full border shadow-xs text-muted-foreground">
              <UploadCloud className="size-6" />
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <span className="font-semibold text-foreground">
                Click to upload or drag & drop
              </span>
              <span className="text-muted-foreground text-xs">
                PDF, AI, PSD, CDR, or PNG (Max 3GB at 300+ DPI)
              </span>
            </div>
          </div>
        )}

        {file && (
          <div className="bg-background dark:bg-card border rounded-lg p-4 flex flex-col gap-4 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary p-2.5 rounded-lg shrink-0">
                <FileText className="size-5" />
              </div>
              <div className="flex-1 min-w-0 flex flex-col">
                <span className="font-medium text-sm text-foreground truncate select-all">
                  {file.name}
                </span>
                <span className="text-muted-foreground text-xs">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </span>
              </div>
              {!uploading && !verifying && !uploadComplete && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFile(null)}
                  className="text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  Change
                </Button>
              )}
            </div>

            {/* Progress Bars */}
            {uploading && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Loader2 className="animate-spin size-3.5" />
                    Uploading assets...
                  </span>
                  <span className="font-mono text-foreground">{uploadProgress}%</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-150"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {verifying && (
              <div className="bg-amber-50/50 border border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/40 rounded-lg p-3 flex items-center gap-3">
                <Loader2 className="animate-spin size-4.5 text-amber-600 dark:text-amber-400 shrink-0" />
                <div className="flex flex-col gap-0.5 text-xs text-amber-800 dark:text-amber-300">
                  <span className="font-semibold">Automated Pre-Flight Check Running...</span>
                  <span>Verifying bleed boundaries, CMYK color spaces, and resolution DPI.</span>
                </div>
              </div>
            )}

            {uploadComplete && (
              <div className="bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900/40 rounded-lg p-3 flex items-center gap-3">
                <CheckCircle2 className="size-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div className="flex flex-col gap-0.5 text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
                  <span>Pre-Flight check complete! Artwork approved.</span>
                  <span>Restarting printing process...</span>
                </div>
              </div>
            )}

            {/* Start Upload Button */}
            {!uploading && !verifying && !uploadComplete && (
              <Button onClick={triggerUpload} className="w-full flex items-center justify-center gap-2">
                Verify and Upload File
                <ArrowRight className="size-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
