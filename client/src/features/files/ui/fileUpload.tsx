"use client";

import { FC, useState } from "react";
import { UploadDropzone } from "@/shared/libs/utils/uploadthing";
import Image from "next/image";
import { FileText, X } from "lucide-react";
import { Skeleton } from "@/shared/ui/skeleton/skeleton";
import { useSkeletonImage } from "@/shared/hooks/useSkeletonImage";
import { cn } from "@/shared";

interface IFileUpload {
  endpoint: "messageFile" | "serverImage";
  value: string;
  onChange: (url: string) => void;
}

const FileUpload: FC<IFileUpload> = ({ endpoint, value, onChange }) => {
  const [fileType, setFileType] = useState("");
  const { isLoaded, handleIsLoaded } = useSkeletonImage();
  const resetFiles = () => onChange("");

  if (value && fileType !== "pdf") {
    return (
      <section className="flex justify-center w-full">
        <div className="relative h-20 w-20 ">
          {!isLoaded && <Skeleton className="h-20 w-20 rounded-full" />}
          <Image
            fill
            src={value}
            alt="Upload"
            loading="lazy"
            className="rounded-full"
            onLoad={handleIsLoaded}
          />
          <button
            className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
            type="button"
            onClick={resetFiles}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </section>
    );
  }
  if (value && fileType === "pdf") {
    return (
      <div
        className={cn(
          "relative flex items-center gap-3 p-3 mt-2 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 shadow-sm hover:bg-zinc-200/50 dark:hover:bg-zinc-800 transition-colors"
        )}
      >
        <div className="flex-shrink-0">
          <FileText className="h-8 w-8 text-indigo-500 dark:text-indigo-400" />
        </div>

        <div className="flex-1 min-w-0">
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="line-clamp-1 flex whitespace-pre-wrap break-all text-start  text-sm md:text-xs  font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            {value}
          </a>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
            Click to open in new tab
          </p>
        </div>

        <button
          onClick={resetFiles}
          className="flex-shrink-0 bg-rose-500 text-white p-1.5 rounded-full hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400 shadow-sm transition-colors"
          type="button"
          aria-label="Remove file"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        const url = res?.[0]?.ufsUrl;
        const uploadedFileType = res?.[0]?.type.split("/").pop();
        if (url) {
          onChange(url);
          setFileType(uploadedFileType ?? "");
        }
      }}
      onUploadError={(error: Error) => console.log(error)}
      className="bg-gray-mode-200 cursor-pointer [&_button]:bg-indigo-600 [&_button]:hover:bg-indigo-500 [&_button]:text-white [&_button[data-state='ready']]:bg-indigo-600 [&_button[data-state='disabled']]:bg-indigo-400 [&_button[data-state='uploading']]:bg-indigo-400 [&_button[data-state='readying']]:bg-indigo-400 [&_button]:cursor-pointer [&_button]:inline-flex [&_button]:items-center [&_button]:justify-center [&_button]:gap-2 [&_button]:whitespace-nowrap [&_button]:rounded-md [&_button]:text-sm [&_button]:font-medium [&_button]:transition-all [&_button]:duration-300 [&_button]:ease-in-out [&_button]:focus-visible:outline-none [&_button]:focus-visible:ring-2 [&_button]:focus-visible:ring-indigo-500 [&_button]:focus-visible:ring-offset-2 [&_button]:disabled:pointer-events-none [&_button]:disabled:opacity-50 [&_button]:shadow-md [&_button]:hover:shadow-lg [&_button]:transform [&_button]:hover:-translate-y-0.5 [&_button]:active:translate-y-0 [&_button]:ring-1 [&_button]:ring-gray-400/30"
    />
  );
};

export default FileUpload;
