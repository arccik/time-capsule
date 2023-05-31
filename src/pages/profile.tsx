import { useSession } from "next-auth/react";
import Image from "next/image";

export default function profile() {
  const { data: sessionData, status } = useSession();
  if (status === "loading") return <div>Loading...</div>;

  return (
    <div className="card mx-auto mb-10 w-[90%] bg-base-100 shadow-xl">
      <figure>
        {sessionData?.user?.image && (
          <Image
            className="rounded-md"
            width={200}
            height={200}
            src={sessionData.user.image}
            alt={sessionData.user.name || "user profile image"}
          />
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{sessionData?.user?.name}</h2>
        <p className="text-sm text-secondary">
          If a dog chews shoes whose shoes does he choose?
        </p>
        <p className="text-md font-bold">{sessionData?.user.email}</p>
      </div>
      <button className="btn-error btn m-10">Logout</button>
    </div>
  );
}
