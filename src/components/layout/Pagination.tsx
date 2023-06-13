import type { Dispatch, SetStateAction } from "react";

export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}: {
  currentPage: number;
  totalPages: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}) {
  if (totalPages === 1) return null;
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1).map(
    (v) => (
      <input
        key={v + currentPage}
        type="radio"
        name="options"
        data-title={v}
        className="btn"
        onClick={() => setCurrentPage(v)}
        defaultChecked={v === currentPage}
      />
    )
  );

  return <div className="btn-group mx-auto">{pageNumbers}</div>;
}
