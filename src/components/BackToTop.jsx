import { FaArrowUp } from "react-icons/fa";

export default function BackToTop() {
  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={goTop}
      className="
        fixed

        bottom-24

        right-6

        z-50

        flex

        h-12

        w-12

        items-center

        justify-center

        rounded-full

        bg-[#302747]

        text-white

        shadow-lg

        transition

        hover:scale-110
      "
    >
      <FaArrowUp />
    </button>
  );
}