import React from "react";
import BPColorPicker from "./BPColorPicker";

import "./Color.css";

function Color() {
  const fixedColors = [
    [4, 101, 161],
    [65, 170, 75],
    [232, 86, 156],
  ];
  return (
    <div className="colorContainer">
      <h1>color</h1>
      <button
        className="btnFloating"
        type="button"
        style={{ position: "absolute", top: "0", right: "0" }}
      >
        flo
      </button>
      <BPColorPicker colors={fixedColors} title={"Cor do óculos"} />
    </div>
  );
}

export default Color;
