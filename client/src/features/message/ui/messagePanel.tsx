import TooltipAction from "@/shared/ui/tooltip/tooltipAction";
import { Edit, Trash } from "lucide-react";
import { FC } from "react";

interface IMessagePanel {
  isCanEdit: boolean;
  deleteAction: () => void;
  editAction: () => void;
}
const MessagePanel: FC<IMessagePanel> = ({
  isCanEdit,
  deleteAction,
  editAction,
}) => (
  <div className="hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5 bg-white dark:bg-zinc-800 border rounded-sm">
    {isCanEdit && (
      <TooltipAction side="top" label="Edit">
        <Edit
          className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-all"
          onClick={editAction}
        />
      </TooltipAction>
    )}
    <TooltipAction side="top" label="Edit">
      <Trash
        className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-all"
        onClick={deleteAction}
      />
    </TooltipAction>
  </div>
);

export default MessagePanel;
