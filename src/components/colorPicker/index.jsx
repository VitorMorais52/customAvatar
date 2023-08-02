/* eslint-disable react/prop-types */
import { SliderPicker } from "react-color";

import "./index.css";

const ColorPicker = ({ currentColor, changeCurrentColor }) => {
  return (
    <div className="containerSliderPicker">
      <SliderPicker
        color={currentColor}
        onChangeComplete={(newColor) => changeCurrentColor(newColor.hex)}
      />
    </div>
  );
};

export default ColorPicker;
