import { useRouter } from "next/router";
import {
  useMemo,
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
} from "react";
import { scrolltoHash } from "~/lib/scrollToHash";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const [page, setPage] = useState(1);

  const router = useRouter();

  const handleClick = (buttonIndex: number) => {
    setPage(buttonIndex);
    scrolltoHash("public-messages");
  };
  useEffect(() => {
    router.query.page = page.toString();
    router.push(router, undefined, { scroll: false });
  }, [page]);

  const pageNumbers = useMemo(
    () =>
      Array.from({ length: totalPages }, (_, i) => i + 1).map((v) => (
        <input
          key={v + page}
          type="radio"
          name="options"
          data-title={v}
          className="btn-xl btn-ghost glass btn"
          onClick={() => handleClick(v)}
          defaultChecked={v === page}
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
