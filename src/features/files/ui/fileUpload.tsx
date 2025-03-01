"use client";

import { FC } from "react";
import { UploadDropzone } from "@/shared/libs/utils/uploadthing";
import Image from "next/image";
import { X } from "lucide-react";
import { Skeleton } from "@/shared/ui/skeleton/skeleton";
import { useSkeletonImage } from "@/shared/hooks/useSkeletonImage";

interface IFileUpload {
  endpoint: "messageFile" | "serverImage";
  value: string;
  onChange: (url: string) => void;
}

const FileUpload: FC<IFileUpload> = ({ endpoint, value, onChange }) => {
  const fileType = value.split(".")[0];
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

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => onChange(res?.[0].ufsUrl)}
      onUploadError={(error: Error) => console.log(error)}
      className="bg-gray-mode-200 cursor-pointer [&_button]:bg-indigo-600 [&_button]:hover:bg-indigo-500 [&_button]:text-white [&_button[data-state='ready']]:bg-indigo-600 [&_button[data-state='disabled']]:bg-indigo-400 [&_button[data-state='uploading']]:bg-indigo-400 [&_button[data-state='readying']]:bg-indigo-400 [&_button]:cursor-pointer [&_button]:inline-flex [&_button]:items-center [&_button]:justify-center [&_button]:gap-2 [&_button]:whitespace-nowrap [&_button]:rounded-md [&_button]:text-sm [&_button]:font-medium [&_button]:transition-all [&_button]:duration-300 [&_button]:ease-in-out [&_button]:focus-visible:outline-none [&_button]:focus-visible:ring-2 [&_button]:focus-visible:ring-indigo-500 [&_button]:focus-visible:ring-offset-2 [&_button]:disabled:pointer-events-none [&_button]:disabled:opacity-50 [&_button]:shadow-md [&_button]:hover:shadow-lg [&_button]:transform [&_button]:hover:-translate-y-0.5 [&_button]:active:translate-y-0 [&_button]:ring-1 [&_button]:ring-gray-400/30"
    />
  );
};

export default FileUpload;
