import React, { useState } from "react";

import "./ColorPicker.css";
import { hslToRgb, rgbToHsl } from "./colorPickFunctions";
import { IColorPicker } from "../../../utils/models";

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

function ColorPicker({ color, getUpdateColors }: IColorPicker) {
  const [copyOriginalColor, setCopyOriginalColor] = useState(color);
  const isBlack = color[0] === color[1] && color[0] === color[2];
  const maxLightness = isBlack ? 1 : 0.9;
  const minLightness = isBlack ? 0 : 0.1;

  console.info("copyOriginalColor", copyOriginalColor);

  const isTheSameColor = (a: number[], b: number[]) =>
    a[0] === b[0] && a[1] === b[1] && a[2] === b[2];

  const mountsRGB = (color: number[]) =>
    `rgb(${color[0]}, ${color[1]}, ${color[2]})`;

  const maxCurrentColor = () => {
    const [h, s] = rgbToHsl(copyOriginalColor);
    return mountsRGB(hslToRgb([h, s, maxLightness]));
  };
  const minCurrentColor = () => {
    const [h, s] = rgbToHsl(copyOriginalColor);
    return mountsRGB(hslToRgb([h, s, minLightness]));
  };
  const getLightness = (rgb?: number[]) => {
    const [h, s, l] = rgbToHsl(rgb || color);
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
                  setCopyOriginalColor(colorItem);
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
      <div className="containerInputLightness" style={{ position: "relative" }}>
        <div
          className="divInput"
          style={{
            margin: "0 auto",
            marginBottom: "0.5rem",
            borderRadius: "8px",
            width: "272px",
            height: "24px",
            background: `linear-gradient(to right, ${minCurrentColor()} 0%, ${mountsRGB(
              copyOriginalColor
            )} ${getLightness(copyOriginalColor)}%,${maxCurrentColor()})`,
          }}
        />
        <input
          type="range"
          min={minLightness * 100}
          max={maxLightness * 100}
          step="1"
          value={getLightness()}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            margin: "0",
            width: "272px",
            height: "24px",
          }}
          onChange={({ target }) => {
            const [h, s] = rgbToHsl(color);
            getUpdateColors(
              hslToRgb([h, s, +target.value / 100]).map((item) =>
                Math.round(item)
              )
            );
          }}
        />
      </div>
      <div style={{ marginLeft: "4px" }}>min {minLightness * 100}</div>
      <div style={{ marginLeft: "4px" }}>{getLightness()}</div>
      <div style={{ marginLeft: "4px" }}>max {maxLightness * 100}</div>
    </div>
  );
}

export default ColorPicker;
