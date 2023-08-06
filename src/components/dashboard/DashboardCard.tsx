import { Capsule } from "@prisma/client";
import React from "react";
import { BsClock, BsTrash } from "react-icons/bs";
import dateFormatter from "~/lib/dateFormatter";
import { api } from "~/utils/api";
import Modal from "../ui/Modal";

type Props = {
  date: Date;
  isPublic: boolean;
  actions?: React.ReactNode;
  icon?: React.ReactNode;
  id: string;
  refetch: () => Promise<Capsule>;
};

export default function DashboardCard({
  actions,
  icon,
  date,
  isPublic,
  id,
  refetch,
}: Props) {
  const [showModal, setShowModal] = React.useState(false);
  const deleteMessage = api.capsule.delete.useMutation({
    onSuccess: async () => {
      await refetch();
    },
  });

  const handleDelete = async () => {
    deleteMessage.mutate({ id });
    setShowModal(false);
  };

  return (
    <>
      <div className="alert m-2 flex flex-row justify-between shadow-lg">
        <div className="flex flex-row items-center text-2xl">
          {icon ? icon : <BsClock />}
          <span className="ml-5">
            <p className="text-sm font-bold">{dateFormatter(date)}</p>
            <span className="text-xs text-primary-focus">
              {isPublic ? "Public" : "Private"}
            </span>
          </span>
        </div>
        <div className="text-end">
          {actions}
          <button
            className="btn-secondary btn ml-2"
            onClick={() => setShowModal(true)}
          >
            <BsTrash className="text-2xl" />
          </button>
        </div>
      </div>
      {showModal && (
        <Modal>
          <h3 className="text-lg font-bold">Delete this message?</h3>
          <p className="py-4">
            The message will be permanently deleted and cannot be recovered.
          </p>
          <div className="modal-action">
            <button
              onClick={() => setShowModal(false)}
              className="btn-outline btn"
            >
              No
            </button>
            <button onClick={handleDelete} className="btn-error btn">
              Yes
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
