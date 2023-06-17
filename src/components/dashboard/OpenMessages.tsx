import dateFormatter from "~/lib/dateFormatter";
import { api } from "~/utils/api";
import Image from "next/image";
import { TiEdit, TiLockOpen, TiMessages, TiTimesOutline } from "react-icons/ti";
export default function OpenMessages() {
  const { data, status } = api.capsule.getOpenCapsuleByUser.useQuery();
  if (status === "loading") return <div>Loading...</div>;
  if (status === "error") return <div>Error</div>;

  // if (!data.length) return null;

  return (
    <div className="grid w-full grid-flow-row gap-4 p-2 lg:grid-flow-col">
      <div>
        <p className="text-3xl font-bold">
          Open <b className="text-secondary">Capsules</b>
        </p>
        <div className="ld:mx-0 mx-auto grid grid-flow-row gap-5 md:grid-flow-col">
          {data.map((capsule) => (
            <div
              className="card image-full m-2 w-full max-w-xl bg-base-100 shadow-xl"
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
                  Open: {capsule.dateTime.toDateString()}
                  Created at: {dateFormatter(capsule.createdAt)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* TO DELETE */}
        <div className="alert m-2 flex w-[95%] flex-row shadow-lg ">
          <div>
            <TiLockOpen className="mr-2 text-2xl" />
            <span>
              <p className="text-sm font-bold">
                Opened: {new Date().toDateString()}
              </p>
              <span className="text-xs text-primary-focus">Private</span>
            </span>
          </div>
          <div className="flex-none">
            <button className="btn-green-200 btn">
              <TiMessages className="text-2xl" />
            </button>
            <button className="btn-secondary btn">
              <TiTimesOutline className="text-2xl" />
            </button>
          </div>
        </div>
        <div className="border-red-20 h-[300px] w-full rounded-md border bg-base-200 p-10 drop-shadow-md">
          <h1 className="mb-4 text-2xl font-bold">Hello from the past</h1>{" "}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
            vero, suscipit nesciunt temporibus facere incidunt voluptate magnam
            atque optio molestiae!
          </p>
          <TiEdit
            size={24}
            className="cursor-pointer hover:text-primary-focus"
          />
          <div className="mt-4 w-full">
            <button className="btn-ghost btn-xs btn absolute bottom-4 left-4">
              Make public
            </button>

            <p className="absolute bottom-4 right-4 font-sans text-xs text-secondary">
              From 21/02/2022
            </p>
          </div>
        </div>
        {/* TO DELETE */}
      </div>
    </div>
  );
}
