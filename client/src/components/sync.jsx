import React from "react";

const Sync = ({ pageSync, page, pageFetching }) => {
  return (
    <p className="no-mb faded mini">
      <span className="inline-icon sync"></span> Last synced failed —{" "}
      <span
        onClick={pageSync.bind(this, page.facebookPageId)}
        className="faded danger-hover text-button">
        Try force sync?
      </span>
    </p>
  );
};

export default Sync;
