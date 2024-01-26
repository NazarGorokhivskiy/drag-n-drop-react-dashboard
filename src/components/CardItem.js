import React from "react";

export default function CardItem({ children }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 20,
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
        <h3>Dummy charts</h3>
        {children}
      </div>
    </div>
  );
}
