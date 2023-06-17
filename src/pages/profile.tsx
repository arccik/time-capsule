import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Profile() {
  const { data: sessionData, status } = useSession();
  if (status === "loading") return <div>Loading...</div>;

  return (
    <div className="hero min-h-[600px] bg-base-200 ">
      <div className="hero-content flex-col lg:flex-row">
        {sessionData?.user?.image && (
          <Image
            className="max-w-sm rounded-lg shadow-2xl"
            width={200}
            height={200}
            src={sessionData.user.image}
            alt={sessionData.user.name || "user profile image"}
          />
        )}
        <div>
          <h1 className="text-5xl font-bold">{sessionData?.user?.name}</h1>
          <p className="font-bold text-primary">{sessionData?.user.email}</p>
          <p className="py-5">
            Dear descendants, today is an extraordinary day — a century of
            Soviet power. We warmly congratulate you on this great and glorious
            jubilee. We know our time is interesting, but yours is even more
            interesting. We are building communism, you&apos;re living under
            communism.
          </p>
          <Link href="/dashboard" className="btn-primary btn">
            To Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
  // return (
  //   <div className="card mx-auto mb-10 w-[90%] bg-base-100 shadow-xl">
  //     <figure>
  //       {sessionData?.user?.image && (
  //         <Image
  //           className="rounded-md"
  //           width={200}
  //           height={200}
  //           src={sessionData.user.image}
  //           alt={sessionData.user.name || "user profile image"}
  //         />
  //       )}
  //     </figure>
  //     <div className="card-body">
  //       <h2 className="card-title">{sessionData?.user?.name}</h2>
  //       <p className="text-sm text-secondary">
  //         If a dog chews shoes whose shoes does he choose?
  //       </p>
  //       <p className="text-md font-bold">{sessionData?.user.email}</p>
  //     </div>
  //     <button className="btn-error btn m-10">Logout</button>
  //   </div>
  // );
}
