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
  const [currentColors, setCurrentColors] = useState<Array<number[] | null>>(
    []
  );

  const currentFillProp = currentComponent.svg[currentItem]?.props.fill;

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
    const theColor = currentColors[currentItem];
    if (!theColor) return null;

    const originalColorsProp = currentComponent["originalColors"];
    const originalColor =
      originalColorsProp && originalColorsProp[currentItem]
        ? hexToRgb(currentComponent["originalColors"][currentItem])
        : null;

    const updatedColorList = originalColor
      ? [originalColor, ...colorList]
      : colorList;

    return (
      <ColorPicker
        color={theColor}
        getUpdateColors={(newValue) => {
          const hexColor = rgbToHex(newValue);
          changeComponentsColor(currentTab, currentItem, hexColor);
        }}
        colorList={updatedColorList}
      />
    );
  };

  useEffect(() => {
    getNavbarColors();
  }, [currentComponent, currentFillProp]);

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
