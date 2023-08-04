/* eslint-disable react/prop-types */
// import { SliderPicker, GithubPicker } from "react-color";

import "./ColorPicker.css";

// const skinColors = [
//   "#70534A",
//   "#7C533E",
//   "#A56C43",
//   "#B56B63",
//   "#EB9694",
//   "#FBA875",
//   "#FFBB94",
//   "#F2CEA5",
//   "#F9DDBD",
//   "#FAD0C3",
//   "#FFD8C9",
//   "#fcf6db",
// ];

const ColorPicker = ({ type, currentColor, changeCurrentColor, colorKey }) => {
  console.info(type, currentColor, changeCurrentColor, colorKey);
  return (
    <div className="containerSliderPicker">
      {/* {type === "slider" ? (
        <SliderPicker
          color={currentColor}
          onChangeComplete={(newColor) => changeCurrentColor(newColor.hex)}
        />
      ) : (
        <GithubPicker
          styles={{ backgroundColor: "transparent", border: "none" }}
          className="githubPickerReplace"
          color={currentColor}
          onChange={(newColor) => changeCurrentColor(newColor.hex)}
          colors={colorKey === "skin" ? skinColors : undefined}
        />
      )} */}
    </div>
  );
};

export default ColorPicker;
