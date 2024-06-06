import React, { ChangeEvent, useEffect, useRef, useState } from "react";

import "./BPColorPicker.css";

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

function BPColorPicker() {
  const [color, setColor] = useState("rgb(4, 101, 161)");
  const [lightness, setLightness] = useState(0);

  const boxRef = useRef<HTMLDivElement>(null);

  // const handleChangeInput = (inputValue: number) => {
  //   // rgb(52, 179, 81)
  //   // rgb(232, 86, 156)
  //   // rgb(232, 86, 156)
  //   // rgb(140, 21, 94)

  //   const r = 140,
  //     g = 21,
  //     b = 94;
  //   const maxValue = 255;
  //   const minValue = 0;

  //   const biggerValue = Math.max(r, g, b);

  //   const currentPorcentValue = (biggerValue * 100) / maxValue;
  //   if (!inputValue) return setLightness(currentPorcentValue);

  //   const nextValue = maxValue * (inputValue / 100);
  //   const increaseValue = nextValue - biggerValue;

  //   const nextR = r + increaseValue,
  //     nextG = g + increaseValue,
  //     nextB = b + increaseValue;

  //   console.info("atual porcentagem de luz", currentPorcentValue);
  //   console.info("valor mandante", biggerValue);
  //   console.info("nextValue", nextValue);

  //   if (boxRef.current)
  //     boxRef.current.style.backgroundColor = `rgb(${nextR}, ${nextG}, ${nextB})`;
  // };
  const handleChangeInput = (inputValue: number) => {
    // #2498f1 mais claro
    // rgb(4, 101, 161)
    // #063452 mais escuro

    // rgb(52, 179, 81)
    // rgb(232, 86, 156)
    // rgb(232, 86, 156)
    // rgb(140, 21, 94)
    // rgb(4, 101, 161)
    // linear-gradient(to right,rgb(51, 0, 5) 0%, rgb(140, 21, 94) 54%,rgb(255, 136, 209))
    // linear-gradient(to right,rgb(51, 8, 34) 0%, rgb(140, 21, 94) 54%,rgb(255, 38, 171))
    // linear-gradient(to right,rgb(0, 0, 51) 0%, rgb(4, 101, 161) 63%,rgb(98, 195, 255))
    const r = 4,
      g = 101,
      b = 161;
    const maxValue = 255;
    const minValue = 0;

    const biggerValue = Math.max(r, g, b);

    const currentPorcentValue = (biggerValue * 100) / maxValue;
    if (!inputValue) return setLightness(currentPorcentValue);

    const nextValue = maxValue * (inputValue / 100);
    const increaseValue = nextValue - biggerValue;

    const nextR = r + increaseValue;
    const proportion = nextR / r;

    console.info("proportion", proportion);

    const nextG = g + increaseValue;

    const nextB = b + increaseValue;

    // console.info("atual porcentagem de luz", currentPorcentValue);
    // console.info("valor mandante", biggerValue);
    // console.info("nextValue", nextValue);

    if (boxRef.current)
      boxRef.current.style.backgroundColor = `rgb(${nextR}, ${nextG}, ${nextB})`;
  };

  useEffect(() => {
    handleChangeInput(0);
  }, []);

  return (
    <div className="containerPicker" style={{ minHeight: "180px" }}>
      <div>
        <h1>color picker</h1>
      </div>
      <div className="firstV" style={{ width: "372px" }}>
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
          {colors.map((color) => (
            <div
              className="colorBall"
              style={{
                backgroundColor: color,
                width: "20px",
                height: "20px",
                marginRight: "8px",
              }}
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
          backgroundColor: color,
          marginBottom: "20px",
        }}
      ></div>
      <div
        id="color-box"
        ref={boxRef}
        style={{
          width: "100px",
          height: "100px",
          margin: "0 auto",
          marginTop: "0.5rem",
          backgroundColor: color,
          marginBottom: "20px",
        }}
      ></div>
      <div
        className="divInput"
        style={{
          margin: "0 auto",
          marginBottom: "0.5rem",
          borderRadius: "8px",
          width: "130px",
          height: "16px",
          background:
            "linear-gradient(to right,rgb(0, 0, 51) 0%, rgb(4, 101, 161) 63%,rgb(98, 195, 255))",
        }}
      />
      <input
        type="range"
        min="20"
        max="80"
        step="1"
        value={lightness}
        onChange={({ target }) => {
          setLightness(+target.value);
          handleChangeInput(+target.value);
        }}
      />
      <div style={{ marginLeft: "4px" }}>{lightness}</div>
    </div>
  );
}

export default BPColorPicker;
