//Modal.tsx
import React from "react";

type Props = {
  children: React.ReactNode;
  show?: boolean;
};

const Modal = ({ children, show }: Props) => {
  if (!show) return null;
  return (
    // we add modal-bottom and modal-middle classes to make it responsive
    //add modal-open for now to test the modal
    <div className="modal modal-open modal-bottom sm:modal-middle">
      {/* we want any content for this modal layout so we just pass the children */}
      <div className="modal-box">{children}</div>
    </div>
  );
};

export default Modal;
