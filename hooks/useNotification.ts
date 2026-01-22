import { useState } from "react";

type NotificationType = "success" | "error";

export const useNotification = () => {
  const [notification, setNotification] = useState<{
    msg: string;
    type: NotificationType;
  } | null>(null);

  const showNotification = (
    msg: string,
    type: NotificationType = "success",
  ) => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 2500);
  };

  return { notification, showNotification };
};
