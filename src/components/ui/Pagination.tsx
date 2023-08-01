import { useRouter } from "next/router";
import { useMemo } from "react";
import { scrolltoHash } from "~/lib/scrollToHash";

export default function Pagination({
  totalPages,
  currentPage,
  setCurrentPage,
}: {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { push, pathname } = useRouter();

  const handleClick = (buttonIndex: number) => {
    void push(
      {
        pathname: pathname,
        query: { page: buttonIndex },
      },
      undefined,
      { scroll: false }
    );
    setCurrentPage(buttonIndex);
    setTimeout(() => {
      scrolltoHash("public-messages");
    }, 300);
  };

  const pageNumbers = useMemo(
    () =>
      Array.from({ length: totalPages }, (_, i) => i + 1).map((v) => (
        <input
          key={v + currentPage}
          type="radio"
          name="options"
          data-title={v}
          aria-label={v.toString()}
          className="join-item btn-xl btn-ghost glass btn"
          onClick={() => handleClick(v)}
          defaultChecked={v === currentPage}
        />
      )),
    [totalPages]
  );
  if (totalPages === 1) return null;

  return (
    <div className="mb-10 mt-10 flex justify-center ">
      <div className="join">{pageNumbers}</div>
    </div>
  );
}
