import { ChannelType } from "@prisma/client";

export const channelTypes: Array<{ label: string; value: ChannelType }> = [
  { label: "Text 📄", value: ChannelType.TEXT },
  { label: "Audio 🔊", value: ChannelType.AUDIO },
  { label: "Video 🎥", value: ChannelType.VIDEO },
];
