import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

interface IMessageImage {
  url: string;
  content: string;
}
const MessageImage: FC<IMessageImage> = ({ content, url }) => (
  <Link
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="relative aspect-square rounded-lg mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48"
  >
    <Image
      src={url}
      alt={content}
      fill
      className="object-cover"
      loading="lazy"
    />
  </Link>
);

export default MessageImage;
