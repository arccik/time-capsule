import dateFormatter from "~/lib/dateFormatter";
import { api } from "~/utils/api";
import Image from "next/image";

export default function OpenMessages() {
  const { data, status } = api.capsule.getOpenCapsuleByUser.useQuery();
  if (status === "loading") return <div>Loading...</div>;
  if (status === "error") return <div>Error</div>;

  // if (!data.length) return null;

  return (
    <div className="grid w-full grid-flow-row gap-4 p-2 lg:grid-flow-col">
      <div className="ld:mx-0 mx-auto">
        <p className="text-3xl font-bold">
          <b className="text-secondary">Open </b> Capsules
        </p>
        {data.map((capsule) => (
          <div
            className="card image-full m-2 max-w-xl bg-base-100 shadow-xl"
            key={capsule.id}
          >
            <figure>
              <Image
                width={800}
                height={400}
                src="/images/bg-time-capsule-found.jpeg"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <span className="-mb-5 text-xs font-bold text-secondary">
                Subject:
              </span>
              <h2 className="card-title"> {capsule.subject}</h2>
              <span className="-mb-4 text-xs font-bold text-secondary">
                Message:
              </span>
              <p>{capsule.message}</p>
              <div className="card-actions justify-end">
                <span className="badge btn-primary">
                  Open: {capsule.dateTime.toDateString()}
                </span>
                <span className="badge-secondary badge">
                  Created at: {dateFormatter(capsule.createdAt)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
