import { api } from "~/utils/api";
import OpenMessage from "./OpenMessage";
import Loader from "../ui/Loader";
import { Suspense } from "react";
export default function OpenMessages() {
  const { data, status, refetch } =
    api.capsule.getOpenCapsulesByUser.useQuery();
  const triggerOpenToPublic = api.capsule.openToPublic.useMutation();
  const deleteMessage = api.capsule.delete.useMutation();

  const handleActivateForPublic = (id: string) => {
    triggerOpenToPublic.mutate({ id });
    refetch()
      .then(() => console.log("refetch"))
      .catch((e) => console.log(e));
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
      <Suspense fallback={<Loader fullScreen={true} />}>
        <div className="ld:mx-0 mx-auto grid grid-flow-row ">
          {data.length ? (
            data.map((capsule) => (
              <OpenMessage
                triggerPublic={() => handleActivateForPublic(capsule.id)}
                opened={capsule.dateTime}
                closed={capsule.createdAt}
                message={capsule.message}
                subject={capsule.subject}
                isPublic={capsule.public}
                key={capsule.id}
                deleteMessage={() => deleteMessage.mutate({ id: capsule.id })}
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
