import dateFormatter from "~/lib/dateFormatter";
import { api } from "~/utils/api";
import Image from "next/image";

export default function OpenMessages() {
  const { data, status } = api.capsule.getOpenCapsuleByUser.useQuery();
  if (status === "loading") return <div>Loading...</div>;
  if (status === "error") return <div>Error</div>;

  return (
    <div className="card  w-full  bg-base-100 shadow-xl">
      <h1 className="ml-4 mt-4 font-bold text-secondary">Open Messages</h1>
      <div className="card-body mx-auto">
        {data.map((capsule) => (
          <div
            className="card image-full w-96 bg-base-100 shadow-xl"
            key={capsule.id}
          >
            <figure>
              <Image
                width={800}
                height={400}
                src="https://wehco.media.clients.ellingtoncms.com/imports/adg/photos/204067059_TimeCapsule01_ne202341418537196_t800.jpg?90232451fbcadccc64a17de7521d859a8f88077d"
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
