import { toast } from "sonner";
import { MdError } from "react-icons/md";

export const triggerToast = (message: string) =>
  toast(message, {
    position: "top-center",
    icon: <MdError />,
  });
