import { useRouter } from "next/router";
import { BiArrowBack } from "react-icons/bi";
import Loader from "~/components/ui/Loader";
import { api } from "~/utils/api";

import OpenMessage from "~/components/open-messages/OpenMessage";

export default function OpenMessagePage() {
  const router = useRouter();
  const { data, status } = api.capsule.getOne.useQuery({
    id: router.query.id as string,
  });
  if (status === "loading") return <Loader />;
  if (status === "error") return <div>Ops. something went wrong!</div>;

  const handleBackClick = () => {
    router.back();
  };
  return (
    <main className="animate-gradient-x bg-gradient-to-r from-green-700 from-10% via-sky-600 via-30% to-emerald-500 to-90% pb-10 dark:from-slate-800 dark:to-slate-950">
      <button
        className="btn-ghost btn-xs btn ml-3 mt-10 text-white md:ml-10"
        onClick={handleBackClick}
      >
        <BiArrowBack />
        Back
      </button>
      {status === "success" && data ? <OpenMessage data={data} /> : <Loader />}
    </main>
  );
}
