import React, { useState } from "react";

import "./ColorPicker.css";
import { hslToRgb, rgbToHsl } from "./colorPickFunctions";
import { IColorPicker } from "../../../utils/models";

function ColorPicker({ color, getUpdateColors, colorList }: IColorPicker) {
  const [copyOriginalColor, setCopyOriginalColor] = useState(color);
  const isBlack = color[0] === color[1] && color[0] === color[2];
  const maxLightness = isBlack ? 1 : 0.9;
  const minLightness = isBlack ? 0 : 0.1;

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
          {colorList.map((colorItem) => {
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
