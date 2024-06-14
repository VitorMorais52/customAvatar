import React from "react";

import "./BPColorPicker.css";
import { hslToRgb, rgbToHsl } from "./colorPickFunctions";

// const colors = [
//   "#110505",
//   "#503323",
//   "#894E25",
//   "#7A4B13",
//   "#AE4E0D",

//   "#9D3921",
//   "#F6C578",
//   "#978265",
//   "#B79884",
//   "#7E7C7D",

//   "#7F5390",
//   "#946CCF",
//   "#6D5EC3",
//   "#1A4BA4",
//   "#0465A1",

//   "#409097",
//   "#1D5C4B",
//   "#41AA4B",
//   "#5C9A35",
//   "#5E6B4F",

//   "#DDD34F",
//   "#DA7142",
//   "#B85155",
//   "#AB6959",
//   "#A7313E",

//   "#8C155E",
//   "#E8569C",
//   "#BD8392",
// ];

const colorListRGB = [
  [0, 0, 0],
  [80, 51, 35],
  [137, 78, 37],
  [122, 75, 19],
  [174, 78, 13],

  [157, 57, 33],
  [246, 197, 120],
  [151, 130, 101],
  [183, 152, 132],
  [126, 124, 125],

  [127, 83, 144],
  [148, 108, 207],
  [109, 94, 195],
  [26, 75, 164],
  [4, 101, 161],

  [64, 144, 151],
  [29, 92, 75],
  [65, 170, 75],
  [92, 154, 53],
  [94, 107, 79],

  [221, 211, 79],
  [218, 113, 66],
  [184, 81, 85],
  [171, 105, 89],
  [167, 49, 62],

  [140, 21, 94],
  [232, 86, 156],
  [189, 131, 146],
];

interface BPColorPicker {
  color: number[];
  getUpdateColors: (color: number[]) => void;
}

function BPColorPicker({ color, getUpdateColors }: BPColorPicker) {
  const isBlack = color[0] === color[1] && color[0] === color[2];
  const maxLightness = isBlack ? 1 : 0.9;
  const minLightness = isBlack ? 0 : 0.1;

  const isTheSameColor = (a: number[], b: number[]) =>
    a[0] === b[0] && a[1] === b[1] && a[2] === b[2];

  const mountsRGB = (color: number[]) =>
    `rgb(${color[0]}, ${color[1]}, ${color[2]})`;

  const maxCurrentColor = () => {
    const [h, s] = rgbToHsl(color);
    mountsRGB(hslToRgb([h, s, maxLightness]));
  };
  const minCurrentColor = () => {
    const [h, s] = rgbToHsl(color);
    mountsRGB(hslToRgb([h, s, minLightness]));
  };
  const getLightness = () => {
    const [h, s, l] = rgbToHsl(color);
    return Math.round(l * 100);
  };
  const boxColor = () => {
    const [h, s] = rgbToHsl(color);
    return hslToRgb([h, s, getLightness() / 100]);
  };

  return (
    <div className="containerPicker" style={{ minHeight: "180px" }}>
      <div className="contentColors" style={{ width: "372px" }}>
        <div
          className="wrapperColors"
          style={{ display: "flex", flexWrap: "wrap", marginLeft: "8px" }}
        >
          {colorListRGB.map((colorItem) => {
            return (
              <button
                type="button"
                key={colorItem + ""}
                className={`colorBall ${
                  isTheSameColor(colorItem, color) ? "selectedColor" : ""
                }`}
                style={{
                  backgroundColor: mountsRGB(colorItem),
                  width: "20px",
                  height: "20px",
                  marginRight: "8px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  const resultColor = colorItem.map((item) => Math.round(item));
                  getUpdateColors(resultColor);
                }}
              />
            );
          })}
        </div>
        <div className="lightingBar">lighting bar</div>
      </div>
      <div
        id="color-box"
        style={{
          width: "100px",
          height: "100px",
          margin: "0 auto",
          marginTop: "0.5rem",
          backgroundColor: mountsRGB(boxColor()),
          marginBottom: "20px",
        }}
      />
      <div
        className="divInput"
        style={{
          margin: "0 auto",
          marginBottom: "0.5rem",
          borderRadius: "8px",
          width: "130px",
          height: "16px",
          background: `linear-gradient(to right, ${minCurrentColor()} 0%, ${mountsRGB(
            color
          )} 63%,${maxCurrentColor()})`,
        }}
      />
      <input
        type="range"
        min={minLightness * 100}
        max={maxLightness * 100}
        step="1"
        value={getLightness()}
        onChange={({ target }) => {
          const [h, s] = rgbToHsl(color);
          console.info("target", +target.value);
          console.info("target getLightness()", getLightness());
          getUpdateColors(
            hslToRgb([h, s, +target.value / 100]).map((item) =>
              Math.round(item)
            )
          );
        }}
        onMouseUp={() => {
          const [h, s] = rgbToHsl(color);
          getUpdateColors(
            hslToRgb([h, s, getLightness() / 100]).map((item) =>
              Math.round(item)
            )
          );
        }}
      />
      <div style={{ marginLeft: "4px" }}>min {minLightness * 100}</div>
      <div style={{ marginLeft: "4px" }}>{getLightness()}</div>
      <div style={{ marginLeft: "4px" }}>max {maxLightness * 100}</div>
    </div>
  );
}

export default BPColorPicker;
