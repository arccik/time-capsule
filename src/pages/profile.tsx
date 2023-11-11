import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Loader from "~/components/ui/Loader";

export default function Profile() {
  const { data: sessionData, status } = useSession();
  if (status === "loading") return <Loader />;

  return (
    <div className="hero min-h-[600px] bg-slate-200 ">
      <div className="hero-content w-2/3 flex-col lg:flex-row">
        {sessionData?.user?.image && (
          <Image
            className="mr-4 max-w-sm rounded-lg shadow-2xl"
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
            MessageTTF is an innovative online platform that lets you create and
            preserve memories in the form of messages, photos and voice messages
            ensuring they remain securely stored until a future date of your
            choosing. With MessageTTF, you can capture the essence of a moment
            and experience the joy of revisiting it in the future.
          </p>
          <Link href="/dashboard" className="btn btn-primary">
            To Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
