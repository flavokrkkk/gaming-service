export interface IChannelSearch {
  label: string;
  type: "channel" | "member";
  data?: Array<{ id: string; icon: React.ReactNode; name: string }>;
}
