import React, { ChangeEvent, useEffect, useRef, useState } from "react";

import "./BPColorPicker.css";
import { hslToRgb, rgbToHsl } from "./colorPickFunctions";

const colors = [
  "#110505",
  "#503323",
  "#894E25",
  "#7A4B13",
  "#AE4E0D",

  "#9D3921",
  "#F6C578",
  "#978265",
  "#B79884",
  "#7E7C7D",

  "#7F5390",
  "#946CCF",
  "#6D5EC3",
  "#1A4BA4",
  "#0465A1",

  "#409097",
  "#1D5C4B",
  "#41AA4B",
  "#5C9A35",
  "#5E6B4F",

  "#DDD34F",
  "#DA7142",
  "#B85155",
  "#AB6959",
  "#A7313E",

  "#8C155E",
  "#E8569C",
  "#BD8392",
];

const colorsRGB = [
  [0, 0, 0],
  [80, 51, 35],
  [137, 78, 37],
  [122, 75, 19],
  [174, 78, 13],

  [157, 57, 33],
  [246, 197, 120],
  [151, 130, 101],
  [151, 130, 101],
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

function BPColorPicker() {
  const [currentColor, setCurrentColor] = useState<number[]>([4, 101, 161]);
  const [lightness, setLightness] = useState(0);

  const [h, s, l] = rgbToHsl(currentColor);

  const getInitLightness = () => {
    if (!currentColor) return;
    setLightness(l * 100);
  };

  const mountsRGB = (color: number[]) =>
    `rgb(${color[0]}, ${color[1]}, ${color[2]})`;

  const maxCurrentColor = () => mountsRGB(hslToRgb([h, s, 0.9]));
  const minCurrentColor = () => mountsRGB(hslToRgb([h, s, 0.1]));
  const boxColor = () => hslToRgb([h, s, lightness / 100]);

  useEffect(() => {
    getInitLightness();
  }, []);

  useEffect(() => {
    setLightness(l * 100);
  }, [currentColor]);

  return (
    <div className="containerPicker" style={{ minHeight: "180px" }}>
      <div className="title">
        <h1>color picker</h1>
      </div>
      <div className="contentColors" style={{ width: "372px" }}>
        <button
          className="btnFloating"
          type="button"
          style={{ position: "absolute", top: "0", right: "0" }}
        >
          flo
        </button>
        <div
          className="header"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button type="button" style={{ position: "absolute", left: "0" }}>
            back
          </button>
          <span style={{ fontSize: "18px" }}>Cor da pele</span>
        </div>
        <div
          className="navbarItems"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div className="item">
            <div className="colorBall" /> item 1
          </div>
          <div className="item">
            <div className="colorBall" /> item 2
          </div>
          <div className="item">
            <div className="colorBall" /> item 3
          </div>
        </div>
        <div
          className="wrapperColors"
          style={{ display: "flex", flexWrap: "wrap", marginLeft: "8px" }}
        >
          {colorsRGB.map((color) => (
            <button
              type="button"
              className="colorBall"
              style={{
                backgroundColor: mountsRGB(color),
                width: "20px",
                height: "20px",
                marginRight: "8px",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => setCurrentColor(color)}
            />
          ))}
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
      />{" "}
      <div
        id="color-box"
        style={{
          width: "100px",
          height: "100px",
          margin: "0 auto",
          marginTop: "0.5rem",
          backgroundColor: "rgb(4, 101, 161)",
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
            currentColor
          )} 63%,${maxCurrentColor()})`,
        }}
      />
      <input
        type="range"
        min="10"
        max="90"
        step="1"
        value={lightness}
        onChange={({ target }) => setLightness(+target.value)}
      />
      <div style={{ marginLeft: "4px" }}>{lightness}</div>
    </div>
  );
}

export default BPColorPicker;
