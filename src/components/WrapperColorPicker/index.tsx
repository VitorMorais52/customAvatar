import React, { useState, useEffect } from "react";
import ColorPicker from "./ColorPicker";

import { WrapperColorPickerProps } from "../../utils/models";
import { hexToRgb, rgbToHex } from "../../utils/functions";

import "./WrapperColorPicker.css";

function WrapperColorPicker({
  currentComponent,
  currentTab,
  changeComponentsColor,
  colorList,
}: WrapperColorPickerProps) {
  const [currentItem, setCurrentItem] = useState(0);

  const getNavbarColors = () => {
    const componentColors: Array<number[] | null> = [];
    currentComponent.svg?.forEach(({ isNotEditable, props }) => {
      if (isNotEditable || !props.fill) return componentColors.push(null);

      const colorInRGB = hexToRgb(props.fill);
      componentColors.push(colorInRGB);
    });
    return [...componentColors];
  };

  const renderNavbarItems = () => {
    const currentColors = getNavbarColors();
    return currentColors.map((color, index) => {
      if (!color) return null;
      return (
        <button
          type="button"
          className={currentItem === index ? "selectedItem" : ""}
          onClick={() => setCurrentItem(index)}
          key={color.toString() + index}
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
    const currentColors = getNavbarColors();
    const theColor = currentColors[currentItem];
    if (!theColor) return null;

    const colorPickerID =
      currentTab + "-" + currentComponent.id + "-" + currentItem;
    return (
      <ColorPicker
        id={colorPickerID}
        color={theColor}
        getUpdateColors={(newValue) => {
          const hexColor = rgbToHex(newValue);
          changeComponentsColor(currentTab, currentItem, hexColor);
        }}
        colorList={colorList}
      />
    );
  };

  useEffect(() => {
    setCurrentItem(0);
  }, [currentComponent]);

  return (
    <div className="colorContainer">
      <h1>color</h1>
      <div className="navbar">{renderNavbarItems()}</div>
      {renderThePicker()}
    </div>
  );
}

export default WrapperColorPicker;
