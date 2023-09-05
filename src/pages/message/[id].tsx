import { useRouter } from "next/router";
import { BiArrowBack } from "react-icons/bi";
import Loader from "~/components/ui/Loader";
import { api } from "~/utils/api";

import PageOpenMessage from "~/components/open-messages/PageOpenMessage";

export default function OpenMessagePage() {
  const router = useRouter();
  const { data, status } = api.capsule.getOne.useQuery({
    id: router.query.id as string,
  });

  const handleBackClick = () => {
    router.back();
  };
  return (
    // <main className="min-h-screen animate-gradient-x whitespace-pre-line bg-gradient-to-r from-green-700 from-10% via-sky-600 via-30% to-emerald-500 to-90% pb-10">
    <main className="bg-[url('/images/bg_bggenerator.png')] bg-cover bg-fixed bg-no-repeat">
      <button
        className="btn btn-ghost btn-xs ml-3 mt-10 text-white md:ml-10"
        onClick={handleBackClick}
      >
        <BiArrowBack />
        Back
      </button>
      {status === "success" && data ? (
        <PageOpenMessage data={data} />
      ) : (
        <Loader />
      )}
      {status === "error" && <div>Ops. something went wrong!</div>}
    </main>
  );
}
