import { useRouter } from "next/router";
import { useMemo, useEffect } from "react";
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
  const { query, push, pathname } = useRouter();

  const handleClick = (buttonIndex: number) => {
    setCurrentPage(buttonIndex);
    scrolltoHash("public-messages");
  };

  useEffect(() => {
    push(
      {
        pathname: pathname,
        query: { page: currentPage },
      },
      undefined,
      { scroll: false }
    );
  }, [currentPage]);

  const pageNumbers = useMemo(
    () =>
      Array.from({ length: totalPages }, (_, i) => i + 1).map((v) => (
        <input
          key={v + currentPage}
          type="radio"
          name="options"
          data-title={v}
          className="btn-xl btn-ghost glass btn"
          onClick={() => handleClick(v)}
          defaultChecked={v === currentPage}
        />
      )),
    [totalPages]
  );
  if (totalPages === 1) return null;

  return (
    <div className="mb-10 mt-10 flex justify-center">
      <div className="btn-group">{pageNumbers}</div>
    </div>
  );
}
