"use client";
import React, { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

export default function Toast({ message, type = "success", onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`toast show position-fixed bottom-0 end-0 m-3 ${
        type === "success" ? "bg-success" : "bg-danger"
      } text-white`}
      role="alert"
    >
      {message}
    </div>
  );
}
