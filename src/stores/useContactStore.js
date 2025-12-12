// Zustand
import { create } from "zustand";

// EMailJS
import emailjs from "@emailjs/browser";

// ENV
const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

// Toast
import { toast } from "react-toastify";

export const useContactStore = create((set, get) => ({
  sendEmail: (form) => {
    if (!form) return;

    emailjs
      .sendForm(serviceId, templateId, form, {
        publicKey: publicKey,
      })
      .then(
        () => {
          toast.success("Email sent successfully!");
        },
        (error) => {
          toast.error(error);
        }
      );
  },
}));
