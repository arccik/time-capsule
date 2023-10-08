import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "~/components/ui/Loader";
import AdminPanel from "~/components/auth/adminPanel";

export default function AdminPanelPage() {
  const { data: sessionData, status } = useSession({ required: true });
  const router = useRouter();
  if (status === "loading") return <Loader />;

  if (sessionData?.user.role !== "ADMIN") {
    void router.push("/404");
  }
  return <AdminPanel />;
}
