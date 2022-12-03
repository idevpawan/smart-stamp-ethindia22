import React from "react";

const Button = (props) => {
  const clickHandler = () => {
    props.onClick();
  };
  return (
    <button
      disabled={props.disabled}
      className="mr-0 my-5 bg-[#2952e3] shadow text-white p-3 px-10 rounded-full cursor-pointer hover:bg-[#2546bd]"
      type={props.type}
      onClick={clickHandler}
    >
      {props.title}
    </button>
  );
};

export default Button;
