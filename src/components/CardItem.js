import React from "react";

export default function CardItem({ id, children }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 20,
        paddingTop: 32,
        borderRadius: 8,
        background: "white",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          position: "relative",
          flex: 1,
        }}
      >
        <h3>Card # {id}</h3>
        {children}
      </div>
    </div>
  );
}
