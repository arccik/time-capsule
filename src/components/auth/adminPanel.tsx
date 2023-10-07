import { api } from "~/utils/api";

export default function AdminPanel() {
  const { data: totalCapsules } = api.admin.getTotalCapsules.useQuery();
  const { data: totalUsers } = api.admin.getTotalUsers.useQuery();
  const { data: totalOpenCapsules } = api.admin.getTotalOpenCapsules.useQuery();
  const { data: mostRecentCapsule } =
    api.admin.getMostReacentCapsule.useQuery();
  const { data: totalComments } = api.admin.getTotalComments.useQuery();

  const { data: capsules } = api.admin.getAll.useQuery();
  return (
    <section>
      <div className="flex justify-center">
        <div className="stats shadow">
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
      <div className="m-10 overflow-x-auto">
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
