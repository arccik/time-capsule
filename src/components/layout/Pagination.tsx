import { useMemo, type Dispatch, type SetStateAction } from "react";

export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}: {
  currentPage: number;
  totalPages: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}) {
  const pageNumbers = useMemo(
    () =>
      Array.from({ length: totalPages }, (_, i) => i + 1).map((v) => (
        <input
          key={v + currentPage}
          type="radio"
          name="options"
          data-title={v}
          className="btn-ghost glass btn-sm btn"
          onClick={() => setCurrentPage(v)}
          defaultChecked={v === currentPage}
        />
      )),
    [totalPages]
  );
  if (totalPages === 1) return null;

  return (
    <div className="m-10 flex justify-center">
      <div className="btn-group">{pageNumbers}</div>
    </div>
  );
}
