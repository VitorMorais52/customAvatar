import React, { useState, useEffect } from "react";
import BPColorPicker from "./BPColorPicker";

import { IComponent } from "../../utils/models";
import { hexToRgb, rgbToHex } from "../../utils/functions";

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
  const [currentItem, setCurrentItem] = useState(0);
  const [currentColors, setCurrentColors] = useState<Array<number[] | null>>(
    []
  );

  const getNavbarColors = () => {
    if (!currentComponent || currentComponent?.isNotEditable) return null;

    const componentColors: Array<number[] | null> = [];
    currentComponent.svg?.forEach(({ isNotEditable, props }) => {
      if (isNotEditable || !props.fill) return componentColors.push(null);

      const colorInRGB = hexToRgb(props.fill);
      componentColors.push(colorInRGB);
    });
    if (!componentColors.length) return;

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
      <BPColorPicker
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
  }, [currentComponent]);

  return (
    <div className="colorContainer">
      <h1>color</h1>
      <div className="navbar">{renderNavbarItems()}</div>
      {renderThePicker()}
    </div>
  );
}

export default Color;
