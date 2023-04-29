import React from "react";

export const Arrow = ({ onClick, arrowDirection }) => {
  let extraStyles = {};
  if (arrowDirection === "<") {
    extraStyles = { left: "-12px" };
  }
  if (arrowDirection === ">") {
    extraStyles = { right: "-2px" };
  }
  return (
    <div
      className="arrows"
      style={{
        ...extraStyles,
        display: "flex",
        background: "#fff",
        borderColor: "rgb(204,204,204)",
        border: "1px solid #ccc",
        borderRadius: "50%",
        position: "absolute",
        top: "45%",
        height: "45px",
        width: "45px",
        zIndex: 100,
        justifyContent: "center",
        alignItems: "center",
        fontSize: "24px",
        margin: "5px",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <span
        style={{ fontSize: "24px", fontWeight: 500, color: "#000" }}
      >{`${arrowDirection}`}</span>
    </div>
  );
};
