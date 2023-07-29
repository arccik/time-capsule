import { api } from "~/utils/api";
import OpenMessage from "./OpenMessage";
export default function OpenMessages() {
  const { data, status, refetch } = api.capsule.getOpenCapsuleByUser.useQuery();
  const triggerOpenToPublic = api.capsule.openToPublic.useMutation();

  const handleActivateForPublic = (id: string) => {
    triggerOpenToPublic.mutate({ id });
    refetch()
      .then(() => console.log("refetch"))
      .catch((e) => console.log(e));
  };

  if (status === "loading") return <div>Loading...</div>;
  if (status === "error") return <div>Error</div>;
  if (!data?.length) return null;
  return (
    <div className="mt-2 w-full p-2">
      <p className="text-3xl font-bold">
        <b className="text-secondary">Opened</b> Messages
      </p>
      <div className="ld:mx-0 mx-auto grid grid-flow-row ">
        {data.map((capsule) => (
          <OpenMessage
            triggerPublic={() => handleActivateForPublic(capsule.id)}
            opened={capsule.dateTime}
            closed={capsule.createdAt}
            message={capsule.message}
            subject={capsule.subject}
            isPublic={capsule.public}
            key={capsule.id}
          />
        ))}
      </div>
    </div>
  );
}
