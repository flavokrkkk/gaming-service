"use client";

import { FC } from "react";
import { UploadDropzone } from "@/shared/libs/utils/uploadthing";
import Image from "next/image";
import { X } from "lucide-react";

interface IFileUpload {
  endpoint: "messageFile" | "serverImage";
  value: string;
  onChange: (url: string) => void;
}

const FileUpload: FC<IFileUpload> = ({ endpoint, value, onChange }) => {
  const fileType = value.split(".")[0];

  const resetFiles = () => onChange("");

  if (value && fileType !== "pdf") {
    return (
      <section className="flex justify-center w-full">
        <div className="relative h-20 w-20 ">
          <Image fill src={value} alt="Upload" className="rounded-full" />
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
      className="bg-indigo-200"
    />
  );
};

export default FileUpload;
