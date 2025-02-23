import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/shared";
import ServerCustomizeForm from "./serverCustomizeForm";
const ServerCustomizeModal = () => {
  return (
    <Dialog open>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Customize your server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Give your server a personality with a name an image. You can always
            change it later
          </DialogDescription>
        </DialogHeader>
        <ServerCustomizeForm />
      </DialogContent>
    </Dialog>
  );
};

export default ServerCustomizeModal;
