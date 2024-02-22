import React from "react";

import "./CircleLoading.css";

function CircleLoading() {
  return (
    <div
      className="circleLoading"
      id="circle"
      style={{ position: "relative", width: "200px" }}
    >
      <svg viewBox="0 0 100 100">
        <path
          d="M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94"
          stroke="#eee"
          strokeWidth="0"
          fillOpacity="0"
        ></path>
        <path
          className="animatedPath"
          d="M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94"
          stroke="#FFEA82"
          strokeWidth="6"
          fillOpacity="0"
          style={{
            strokeDasharray: "295.416, 295.416",
            strokeDashoffset: "295.416",
          }}
        ></path>
      </svg>
    </div>
  );
}

export default CircleLoading;
