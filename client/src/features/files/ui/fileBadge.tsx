import { cn } from "@/shared";
import { FileText } from "lucide-react";
import Link from "next/link";
import React, { FC, PropsWithChildren } from "react";

interface IFileBadge {
  url: string;
  title?: string;
}
const FileBadge: FC<IFileBadge & PropsWithChildren> = ({
  title = "PDF File",
  url,
  children,
}) => (
  <div
    className={cn(
      "relative flex items-center gap-3 p-3 mt-2 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 shadow-sm hover:bg-zinc-200/50 dark:hover:bg-zinc-800 transition-colors"
    )}
  >
    <div className="flex-shrink-0">
      <FileText className="h-8 w-8 text-indigo-500 dark:text-indigo-400" />
    </div>

    <div className="flex-1 min-w-0">
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="line-clamp-1 flex whitespace-pre-wrap break-all text-start  text-sm md:text-xs  font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
      >
        {title}
      </Link>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
        Click to open in new tab
      </p>
    </div>
    {children}
  </div>
);

export default FileBadge;
