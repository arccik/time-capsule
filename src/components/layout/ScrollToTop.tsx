import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

type Props = {};

export default function ScrollToTop({}: Props) {
  const [showBtn, setShowBtn] = useState<Boolean>(false);
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    });
  }, []);
  if (!showBtn) return null;
  return (
    <div className="toast">
      <button
        onClick={handleClick}
        className="btn-outline btn-square btn-sm btn"
      >
        <FaArrowUp />
      </button>
    </div>
  );
}
