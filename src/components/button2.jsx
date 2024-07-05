import React from "react";

const CustomButton = (props) => {
  return (
    <div>
      <button
        className={props.className}
        type={props.type}
        style={{
          width: props.width,
          height: props.height,
          padding: props.padding,
          margin: props.margin,
          color: props.color,
          backgroundColor: props.backgroundColor,
          border: props.border,
          borderRadius: props.rounded,
          fontSize: props.fs,
          fontWeight: props.fw,
          textTransform: props.textTransform,
        }}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    </div>
  );
};

export default CustomButton;
