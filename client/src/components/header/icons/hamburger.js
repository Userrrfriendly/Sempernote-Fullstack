import React from "react";

const Hamburger = props => {
  return (
    <button
      title="toggle menu"
      className="nav-button"
      onClick={props.toggleDrawer}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        focusable="false"
        aria-hidden="true"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
      </svg>
    </button>
  );
};

export default Hamburger;
