import React from "react";

const ToolboxItem = ({ title, onClick }) => (
  <div
    style={{
      backgroundColor: "lightgreen",
      width: 64,
      height: 64,
      padding: 16,
      fontSize: 24,
      boxSizing: "border-box",
      cursor: 'pointer'
    }}
    onClick={onClick}
  >
    {title}
  </div>
);

export default function Toolbox({ items = [], onSelect }) {
  return (
    <div
      style={{
        padding: 16,
        backgroundColor: 'lightcyan',
        display: "flex",
        gap: 12,
        flexWrap: "wrap",
        maxWidth: "100%",
      }}
    >
      <h3>Items toolbox:</h3>
      {items.map((item) => (
        <ToolboxItem title={item.id} onClick={() => onSelect(item)} />
      ))}
    </div>
  );
}
