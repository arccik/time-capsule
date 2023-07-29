import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";


export default function ScrollToTop() {
  const [showBtn, setShowBtn] = useState<boolean>(false);
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 800) {
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
        className="btn-outline btn-square btn-sm btn border-white"
      >
        <FaArrowUp color="white" />
      </button>
    </div>
  );
}
