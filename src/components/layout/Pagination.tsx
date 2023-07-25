import { useRouter } from "next/router";
import { useMemo, useEffect, useState } from "react";
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
    router
      .push(
        {
          pathname: "/",
          query: { page },
        },
        undefined,
        { scroll: false }
      )
      .catch((e: Error | undefined) => console.error(e?.message));
  }, [page]);

  useEffect(() => {
    if (router.query.page) {
      setPage(parseInt(router.query.page as string));
    }
  }, [router.query.page]);

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
