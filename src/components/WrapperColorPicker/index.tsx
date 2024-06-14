import React, { useState, useEffect } from "react";
import ColorPicker from "./ColorPicker";

import { IColorProps } from "../../utils/models";
import { hexToRgb, rgbToHex } from "../../utils/functions";

import "./WrapperColorPicker.css";

function Color({
  currentComponent,
  currentTab,
  changeComponentsColor,
}: IColorProps) {
  const [currentItem, setCurrentItem] = useState(0);
  const [currentColors, setCurrentColors] = useState<Array<number[] | null>>(
    []
  );

  const currentFillProp = currentComponent.svg[currentItem].props.fill;

  const getNavbarColors = () => {
    const componentColors: Array<number[] | null> = [];
    currentComponent.svg?.forEach(({ isNotEditable, props }) => {
      if (isNotEditable || !props.fill) return componentColors.push(null);

      const colorInRGB = hexToRgb(props.fill);
      componentColors.push(colorInRGB);
    });

    setCurrentColors([...componentColors]);
  };

  const renderNavbarItems = () => {
    return currentColors.map((color, index) => {
      if (!color) return null;
      return (
        <button
          type="button"
          className={currentItem === index ? "selectedItem" : ""}
          onClick={() => setCurrentItem(index)}
          key={color.toString()}
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
    const theColor = currentColors[currentItem];

    if (!theColor) return null;

    return (
      <ColorPicker
        color={theColor}
        getUpdateColors={(newValue) => {
          const hexColor = rgbToHex(newValue);
          changeComponentsColor(currentTab, currentItem, hexColor);
        }}
      />
    );
  };

  useEffect(() => {
    getNavbarColors();
  }, [currentFillProp]);

  return (
    <div className="colorContainer">
      <h1>color</h1>
      <div className="navbar">{renderNavbarItems()}</div>
      {renderThePicker()}
    </div>
  );
}

export default Color;
