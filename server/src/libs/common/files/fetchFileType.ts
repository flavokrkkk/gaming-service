export const fetchFileType = async (
  url: string | null
): Promise<string | null> => {
  if (!url) return null;
  const res = await fetch(url, { method: "HEAD" });
  const contentType = res.headers.get("Content-Type")?.split("/").pop();
  return contentType || "";
};
