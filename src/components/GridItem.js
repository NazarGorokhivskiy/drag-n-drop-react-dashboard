import React from "react";
import "./GridItem.css";
import CloseIcon from "../assets/CloseIcon";

const CloseButton = ({ onClick }) => (
  <div
    style={{
      position: "absolute",
      top: 16,
      right: 16,
      width: 24,
      height: 24,
      cursor: "pointer",
      zIndex: 2,
    }}
    onClick={onClick}
  >
    <CloseIcon />
  </div>
);

const GridItem = React.forwardRef(
  (
    {
      content,
      className,
      onClose,
      onMouseDown,
      onMouseUp,
      onTouchEnd,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        style={{ ...props.style, flex: "display" }}
        className={`${className} gridItem`}
        {...props}
      >
        <CloseButton onClick={onClose} />
        {content}
        {props.children}
        <div
          style={{
            position: "absolute",
            bottom: 8,
            right: 32,
            left: 8,
            padding: 4,
            cursor: "pointer",
            backgroundColor: "lightpink",
          }}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onTouchEnd={onTouchEnd}
        >
          Click here to drag
        </div>
      </div>
    );
  }
);

export default GridItem;
