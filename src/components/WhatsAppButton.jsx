import { FaWhatsapp } from "react-icons/fa";
import {
  createWhatsAppLink,
  whatsappMessages,
} from "../utils/whatsapp";

export default function WhatsAppButton() {
  return (
    <a
      href={createWhatsAppLink(whatsappMessages.floating)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="
        fixed
        bottom-6
        right-6
        z-50

        flex
        h-16
        w-16
        items-center
        justify-center

        rounded-full

        bg-green-500

        text-4xl
        text-white

        shadow-xl

        transition-all
        duration-300

        hover:scale-110
        hover:bg-green-600
      "
    >
      <FaWhatsapp />
    </a>
  );
}