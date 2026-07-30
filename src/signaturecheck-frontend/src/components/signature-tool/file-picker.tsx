import { FileText, RefreshCcw, UploadCloud, X } from "lucide-react";
import type { DragEvent, RefObject } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { formatFileSize } from "./status-view";

type FilePickerProps = {
  inputRef: RefObject<HTMLInputElement | null>;
  selectedFile: File | null;
  isDragging: boolean;
  isPending: boolean;
  accept: string;
  onFileChange: (file: File | null) => void;
  onDraggingChange: (isDragging: boolean) => void;
  onClear: () => void;
};

export function FilePicker({
  inputRef,
  selectedFile,
  isDragging,
  isPending,
  accept,
  onFileChange,
  onDraggingChange,
  onClear,
}: FilePickerProps) {
  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    onDraggingChange(false);
    onFileChange(event.dataTransfer.files?.[0] ?? null);
  }

  return (
    <div className="space-y-3">
      <input
        id="signature-file"
        ref={inputRef}
        className="peer sr-only"
        type="file"
        accept={accept}
        aria-describedby="upload-requirements"
        disabled={isPending}
        tabIndex={selectedFile ? -1 : undefined}
        onChange={(event) => onFileChange(event.target.files?.[0] ?? null)}
      />
      {!selectedFile ? (
        <label
          htmlFor="signature-file"
          className={cn(
            "flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed bg-secondary/40 px-5 py-8 text-center transition-colors",
            "hover:border-primary/60 hover:bg-accent/60 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
            isDragging && "border-primary bg-accent",
            isPending && "pointer-events-none opacity-60",
          )}
          onDragEnter={(event) => {
            event.preventDefault();
            onDraggingChange(true);
          }}
          onDragOver={(event) => event.preventDefault()}
          onDragLeave={() => onDraggingChange(false)}
          onDrop={handleDrop}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-md bg-accent text-primary">
            <UploadCloud className="h-6 w-6" aria-hidden={true} />
          </span>
          <span className="mt-4 font-semibold text-foreground">Kéo thả file vào đây</span>
          <span className="mt-1 text-sm leading-6 text-muted-foreground">
            hoặc nhấn để chọn file từ máy tính
          </span>
          <span className="mt-4 rounded-md border bg-white px-3 py-2 text-sm font-medium text-foreground">
            Chọn file
          </span>
        </label>
      ) : (
        <div className="flex flex-col gap-3 rounded-md border bg-secondary/30 p-3 sm:flex-row sm:items-center">
          <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent text-primary sm:flex">
            <FileText className="h-5 w-5" aria-hidden={true} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">{selectedFile.name}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {formatFileSize(selectedFile.size)}
              {selectedFile.type ? ` · ${selectedFile.type}` : ""}
            </p>
          </div>
          <div className="flex items-center gap-1 self-end sm:self-auto">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isPending}
              onClick={() => inputRef.current?.click()}
            >
              <RefreshCcw className="hidden h-4 w-4 sm:block" aria-hidden={true} />
              Đổi file
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              aria-label={`Bỏ file ${selectedFile.name}`}
              disabled={isPending}
              onClick={onClear}
            >
              <X className="h-4 w-4" aria-hidden={true} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
