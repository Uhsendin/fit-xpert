import React from 'react';

export function Arrow(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.4em"
      height="1.4em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M16 22L6 12L16 2l1.775 1.775L9.55 12l8.225 8.225L16 22Z"
      ></path>
    </svg>
  );
}
export default Arrow;
