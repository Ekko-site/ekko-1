import React from "react";

const Loading = ({ children, column = false, style = {}, full = false }) => {
  let containerStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    verticalAlign: "middle",
    margin: "0 6px",
    ...style
  };
  let childStyle = {};
  if (column) {
    containerStyle.display = "flex";
    containerStyle.flexDirection = "column";
    childStyle.marginBottom = "1em";
  }
  const fullStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    width: "100%",
    height: "100%",
    zIndex: 1000
  };
  return (
    <div style={full ? fullStyle : containerStyle}>
      <div className="see-it-in-action__loader" style={childStyle} />
      {children}
    </div>
  );
};

export default Loading;
