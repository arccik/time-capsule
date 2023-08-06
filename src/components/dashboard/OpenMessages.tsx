import { api } from "~/utils/api";
import OpenMessage from "./OpenMessage";
import Loader from "../ui/Loader";
import { Suspense } from "react";


export default function OpenMessages() {
  const { data, status, refetch } =
    api.capsule.getOpenCapsulesByUser.useQuery();
  const triggerOpenToPublic = api.capsule.openToPublic.useMutation();

  const handleActivateForPublic = async (id: string) => {
    triggerOpenToPublic.mutate({ id });
    await refetch();
  };

  if (status === "loading") return <Loader />;
  if (status === "error")
    return (
      <div className="h-20 w-20 text-2xl text-red-500">
        Ops. something went wrong 🙃
      </div>
    );

  return (
    <div className="mt-2 w-full p-2">
      <p className="text-3xl font-bold">
        <b className="text-secondary">Opened</b> Messages
      </p>
      <Suspense fallback={<Loader />}>
        <div className="ld:mx-0 mx-auto grid grid-flow-row ">
          {data.length ? (
            data.map((capsule) => (
              <OpenMessage
                id={capsule.id}
                triggerPublic={() => handleActivateForPublic(capsule.id)}
                opened={capsule.dateTime}
                closed={capsule.createdAt}
                message={capsule.message}
                subject={capsule.subject}
                isPublic={capsule.public}
                key={capsule.id}
                refetch={refetch}
              />
            ))
          ) : (
            <p className="mt-10  text-center text-sm text-secondary">
              You have no open messages.
            </p>
          )}
        </div>
      </Suspense>
    </div>
  );
}
