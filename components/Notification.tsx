import React from "react";
import { Check, AlertCircle } from "lucide-react";

interface NotificationProps {
  msg: string;
  type: "success" | "error";
}

export const Notification: React.FC<NotificationProps> = ({ msg, type }) => (
  <div
    className={`fixed top-6 right-6 z-50 px-5 py-3.5 rounded-2xl ${
      type === "error" ? "bg-red-500" : "bg-emerald-500"
    } text-white shadow-2xl animate-in slide-in-from-top-5 duration-300`}
  >
    <div className="flex items-center gap-2.5 font-medium">
      {type === "error" ? <AlertCircle size={18} /> : <Check size={18} />}
      {msg}
    </div>
  </div>
);
