import { api } from "~/utils/api";
import Loader from "../ui/Loader";
import Modal from "../ui/Modal";
import { useState } from "react";

export default function AdminPanel() {
  const [selectedCapsuleId, setSelectedCapsuleId] = useState<string | null>(
    null
  );
  const { data: totalCapsules, status: totalCapsuleStatus } =
    api.admin.getTotalCapsules.useQuery();
  const { data: totalUsers, status: totalUsersStatus } =
    api.admin.getTotalUsers.useQuery();
  const { data: totalOpenCapsules, status: totalOpenCapsulesStatus } =
    api.admin.getTotalOpenCapsules.useQuery();
  const { data: mostRecentCapsule, status: mostRecentCapsuleStatus } =
    api.admin.getMostReacentCapsule.useQuery();
  const { data: totalComments, status: totalCommentsStatus } =
    api.admin.getTotalComments.useQuery();

  const {
    data: capsules,
    status: capsulesStatus,
    refetch,
  } = api.admin.getAll.useQuery();
  const deleteCapsule = api.admin.deleteCapsule.useMutation({
    onSuccess: async () => await refetch(),
    onError: () => console.error("Something went wrong, record not deleted"),
  });

  const handleDelete = (id: string) => {
    deleteCapsule.mutate({ id });
    setSelectedCapsuleId(null);
  };

  if (
    [
      totalCapsuleStatus,
      totalUsersStatus,
      totalOpenCapsulesStatus,
      mostRecentCapsuleStatus,
      totalCommentsStatus,
      capsulesStatus,
    ].includes("loading")
  ) {
    return <Loader />;
  }
  return (
    <section>
      <div className="flex justify-center md:mt-10">
        <div className="stats stats-vertical shadow md:stats-horizontal">
          <div className="stat place-items-center">
            <div className="stat-title">Total Capsules</div>
            <div className="stat-value">{totalCapsules}</div>
            {/* <div className="stat-desc">From January 1st to February 1st</div> */}
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Total Users</div>
            <div className="stat-value text-secondary">{totalUsers}</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Total Open Capsules</div>
            <div className="stat-value">{totalOpenCapsules}</div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-title">Total Comments</div>
            <div className="stat-value">{totalComments}</div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-title">Last Created</div>
            <div className="stat-value">
              {mostRecentCapsule?.createdAt.toDateString()}
            </div>
            {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto md:m-10">
        <Modal show={!!selectedCapsuleId}>
          <h3 className="text-lg font-bold">Delete this message?</h3>
          <p className="py-4">
            The message will be permanently deleted and cannot be recovered.
          </p>
          <div className="modal-action">
            <button
              onClick={() => setSelectedCapsuleId(null)}
              className="btn btn-outline"
            >
              No
            </button>
            <button
              onClick={() => handleDelete(selectedCapsuleId!)}
              className="btn btn-error"
            >
              Yes
            </button>
          </div>
        </Modal>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>User</th>
              <th>Capsule Subject</th>
              <th>Created Date</th>
              <th>Open Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {capsules?.map((capsule) => (
              <tr key={capsule.id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        {capsule.user.image ? (
                          <img
                            src={capsule.user.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        ) : null}
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{capsule.user.name}</div>
                      <div className="text-sm opacity-50">
                        {capsule.user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {capsule.subject}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {capsule.createdAt.toDateString()}
                  </span>
                </td>
                <td>{capsule.createdAt.toDateString()}</td>
                <td>{capsule.dateTime.toLocaleDateString()}</td>
                <th>
                  <button
                    onClick={() =>
                      window.open(`/message/${capsule.id}`, "_blank")
                    }
                    className="btn btn-ghost btn-xs"
                  >
                    Open
                  </button>
                  <button
                    onClick={() => setSelectedCapsuleId(capsule.id)}
                    className="btn btn-error btn-xs"
                  >
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </section>
  );
}
