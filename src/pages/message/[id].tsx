import { useRouter } from "next/router";
import { BiArrowBack } from "react-icons/bi";
import Loader from "~/components/ui/Loader";
import { api } from "~/utils/api";

import PageOpenMessage from "~/components/open-messages/PageOpenMessage";
import Head from "next/head";

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
      <Head>
        <title>{data?.subject}</title>
        <meta name="description" content={data?.message} key="desc" />
        <meta
          property="og:title"
          content={"MessageTTF - ".concat(data?.subject || "")}
        />
        <meta
          property="og:description"
          content={data?.message.substring(0, 100).concat("...")}
        />
        {data?.image && <meta property="og:image" content={data?.image} />}
      </Head>
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
