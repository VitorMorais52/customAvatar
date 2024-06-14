import React, { useState } from "react";
import BPColorPicker from "./BPColorPicker";

import { IComponent } from "../../utils/models";
import { hexToRgb } from "../../utils/functions";

import "./Color.css";
type ChangeComponentsColor = (
  key: string,
  index: number,
  color: string
) => void;

interface IColor {
  currentComponent: IComponent;
  currentTab: string;
  changeComponentsColor: ChangeComponentsColor;
}

function Color({
  currentComponent,
  currentTab,
  changeComponentsColor,
}: IColor) {
  const fixedColors = [4, 101, 161];

  const [currentItem, setCurrentItem] = useState(0);

  if (!currentComponent || currentComponent?.isNotEditable) return null;

  const componentColors: Array<number[] | null> = [];
  currentComponent.svg?.forEach(({ isNotEditable, props }) => {
    if (isNotEditable || !props.fill) return componentColors.push(null);

    const colorInRGB = hexToRgb(props.fill);
    componentColors.push(colorInRGB);
  });
  if (!componentColors.length) return;

  // console.info("color rerender", componentColors[currentItem]);
  // console.info("currentItem rerender", currentItem);

  // console.info("component colors", componentColors);
  // console.info("currentComponent ", currentComponent);

  const renderNavbarItems = () => {
    return componentColors.map((color, index) => {
      if (!color) return null;
      return (
        <button
          type="button"
          className={currentItem === index ? "selectedItem" : ""}
          onClick={() => setCurrentItem(index)}
          style={{
            margin: "0 auto",
            padding: "0.5rem",
            width: "fit-content",
            backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
          }}
        >
          item {index}
        </button>
      );
    });
  };

  const renderThePicker = () => {
    const theColor = componentColors[currentItem];

    if (!theColor) return null;

    return (
      <BPColorPicker
        color={theColor}
        getUpdateColors={(newValue) => {
          const rgbColor = `rgb(${newValue[0]},${newValue[1]},${newValue[2]})`;
          changeComponentsColor(currentTab, currentItem, rgbColor);
        }}
      />
    );
  };

  return (
    <div className="colorContainer">
      <h1>color</h1>
      <div className="navbar">{renderNavbarItems()}</div>
      {renderThePicker()}
    </div>
  );
}

export default Color;
