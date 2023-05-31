import React from "react";

type Props = {};

export default function Footer({}: Props) {
  return (
    <footer className="card-body">
      <h2 className="card-title">Life hack</h2>
      <p>Click to find our how does this stuff is working here!</p>
      <div className="card-actions justify-end">
        <button className="btn-primary btn">Learn now!</button>
      </div>
    </footer>
  );
}
