"use client";

import { useMutation } from "@tanstack/react-query";
import { AlertCircle, Loader2, LockKeyhole, ShieldCheck } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { verifySignature } from "@/lib/verification-api";

import { FilePicker } from "./file-picker";
import { VerificationResult } from "./verification-result";

const maxSizeBytes = 25 * 1024 * 1024;
export type SignatureToolFileType = "all" | "cades" | "pdf" | "xml";

const fileTypeOptions: Record<
  SignatureToolFileType,
  {
    acceptedExtensions: Set<string>;
    accept: string;
    requirements: string;
    invalidMessage: string;
  }
> = {
  all: {
    acceptedExtensions: new Set([".pdf", ".xml", ".p7s", ".p7m"]),
    accept: ".pdf,.xml,.p7s,.p7m,application/pdf,text/xml,application/xml",
    requirements: "PDF, XML, P7S hoặc P7M · Tối đa 25 MB",
    invalidMessage: "Định dạng chưa hỗ trợ. Hãy chọn file PDF, XML, P7S hoặc P7M.",
  },
  pdf: {
    acceptedExtensions: new Set([".pdf"]),
    accept: ".pdf,application/pdf",
    requirements: "PDF · Tối đa 25 MB",
    invalidMessage: "Trang này chỉ nhận file PDF. Hãy chọn một file có phần mở rộng .pdf.",
  },
  xml: {
    acceptedExtensions: new Set([".xml"]),
    accept: ".xml,text/xml,application/xml",
    requirements: "XML · Tối đa 25 MB",
    invalidMessage: "Trang này chỉ nhận file XML. Hãy chọn một file có phần mở rộng .xml.",
  },
  cades: {
    acceptedExtensions: new Set([".p7s", ".p7m"]),
    accept: ".p7s,.p7m,application/pkcs7-signature,application/pkcs7-mime",
    requirements: "P7S hoặc P7M · Tối đa 25 MB",
    invalidMessage: "Trang này chỉ nhận file P7S hoặc P7M.",
  },
};

export function SignatureTool({ fileType = "all" }: { fileType?: SignatureToolFileType }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [clientError, setClientError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const mutation = useMutation({ mutationFn: verifySignature });
  const fileOptions = fileTypeOptions[fileType];

  useEffect(() => {
    if (mutation.data) {
      resultRef.current?.focus();
    }
  }, [mutation.data]);

  function resetInput() {
    if (inputRef.current) inputRef.current.value = "";
  }

  function selectFile(file: File | null) {
    setClientError(null);
    mutation.reset();

    if (!file) {
      setSelectedFile(null);
      return;
    }

    const extension = file.name.includes(".")
      ? file.name.slice(file.name.lastIndexOf(".")).toLowerCase()
      : "";

    if (!fileOptions.acceptedExtensions.has(extension)) {
      setSelectedFile(null);
      setClientError(fileOptions.invalidMessage);
      resetInput();
      return;
    }

    if (file.size > maxSizeBytes) {
      setSelectedFile(null);
      setClientError("File vượt quá giới hạn 25 MB. Hãy chọn file nhỏ hơn.");
      resetInput();
      return;
    }

    setSelectedFile(file);
  }

  function clearFile() {
    setSelectedFile(null);
    setClientError(null);
    mutation.reset();
    resetInput();
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (selectedFile && !mutation.isPending) {
      mutation.mutate(selectedFile);
    }
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-slate-200 bg-white">
        <div className="border-b px-4 py-4 sm:px-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                {selectedFile ? "File đã chọn" : "Chọn file cần kiểm tra"}
              </h2>
              <p id="upload-requirements" className="mt-1 text-sm leading-6 text-muted-foreground">
                {fileOptions.requirements}
              </p>
            </div>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent text-primary">
              <ShieldCheck className="h-5 w-5" aria-hidden={true} />
            </span>
          </div>
        </div>

        <form className="space-y-4 p-4 sm:p-6" onSubmit={submit}>
          <FilePicker
            inputRef={inputRef}
            selectedFile={selectedFile}
            isDragging={isDragging}
            isPending={mutation.isPending}
            accept={fileOptions.accept}
            onFileChange={selectFile}
            onDraggingChange={setIsDragging}
            onClear={clearFile}
          />

          {(clientError || mutation.error) && (
            <div role="alert" className="flex gap-3 rounded-md border border-red-200 bg-red-50 p-3 text-red-950">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden={true} />
              <p className="text-sm leading-6">
                {clientError ?? mutation.error?.message ?? "Không thể kiểm tra file lúc này."}
              </p>
            </div>
          )}

          {mutation.isPending && (
            <div
              role="status"
              aria-live="polite"
              className="flex gap-3 rounded-md border border-sky-200 bg-sky-50 p-3 text-sky-950"
            >
              <Loader2 className="mt-0.5 h-4 w-4 shrink-0 animate-spin" aria-hidden={true} />
              <div>
                <p className="text-sm font-semibold">Đang kiểm tra chữ ký số</p>
                <p className="mt-1 text-sm leading-6">
                  Quá trình có thể mất thêm thời gian khi kiểm tra OCSP hoặc CRL.
                </p>
              </div>
            </div>
          )}

          <Button className="h-11 w-full text-base" type="submit" disabled={!selectedFile || mutation.isPending}>
            {mutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden={true} />
                Đang kiểm tra
              </>
            ) : (
              <>
                <ShieldCheck className="h-4 w-4" aria-hidden={true} />
                Kiểm tra chữ ký số
              </>
            )}
          </Button>

          <div className="flex items-start justify-center gap-2 text-center text-xs leading-5 text-muted-foreground">
            <LockKeyhole className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden={true} />
            <p>File chỉ được dùng cho lần kiểm tra này và không được lưu trữ.</p>
          </div>
        </form>
      </Card>

      {mutation.data && (
        <section
          ref={resultRef}
          tabIndex={-1}
          aria-labelledby="verification-result-heading"
          className="scroll-mt-20 rounded-md border bg-white p-4 outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-6"
        >
          <VerificationResult report={mutation.data} />
        </section>
      )}
    </div>
  );
}
