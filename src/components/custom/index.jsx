import { useState } from "react";
import ColorPicker from "../colorPicker";

import Body from "../body";
import * as AllHair from "../parts/hair";
import * as AllEyebrowAndNose from "../parts/eyebrowAndNose";
import * as AllMouth from "../parts/mouth";

import "./Custom.css";

const tabsConfig = {
  hair: { title: "Cabelo", list: AllHair },
  mouth: { title: "Boca", list: AllMouth },
  eyebrowAndNose: {
    title: "Sobrancelhas/Nariz",
    list: AllEyebrowAndNose,
  },
};

function Custom() {
  const [currentTab, setCurrentTab] = useState("hair");
  const [colorSettings, setColorSettings] = useState({
    hair: "#4D191A",
    skin: "",
    background: "",
    tshirt: "",
  });
  const [partsSettings, setPartsSettings] = useState({
    hair: "one",
    eyebrowAndNose: "one",
    mouth: "one",
  });

  const changeColorSettings = (colorKey, value) =>
    setColorSettings({ ...colorSettings, [colorKey]: value });

  const setConfigs = (value) =>
    setPartsSettings({ ...partsSettings, [currentTab]: value });

  return (
    <div className="container">
      <Body
        hairType={partsSettings.hair}
        eyebrowAndNoseType={partsSettings.eyebrowAndNose}
        mouthType={partsSettings.mouth}
        partsSettings={partsSettings}
        colorSettings={colorSettings}
      />
      <h2>Editar</h2>
      <div className="bar">
        {Object.entries(tabsConfig).map(([key, tabConfig]) => (
          <div
            data-activate={currentTab === key}
            key={key}
            onClick={() => setCurrentTab(key)}
          >
            {tabConfig.title}
          </div>
        ))}
      </div>
      {["hair"].includes(currentTab) && (
        <div className="colorPickerWrapper">
          <ColorPicker
            currentColor={colorSettings.hair}
            changeCurrentColor={(value) => changeColorSettings("hair", value)}
          />
        </div>
      )}
      <div className="options">
        {Object.entries(tabsConfig[currentTab].list).map(
          ([title, Component], index) => (
            <div
              key={index}
              data-activate={
                partsSettings[currentTab] === title.toLocaleLowerCase()
              }
              onClick={() => setConfigs(title.toLocaleLowerCase())}
            >
              <Component
                translateValues={{ x: "0", y: "0" }}
                isIndividualComponent={true}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Custom;
