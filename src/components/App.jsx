import { useState } from "react";
import ColorPicker from "./ColorPicker";

import AssembledBody from "./AssembledBody";
import Options from "./Options";
import NavBar from "./NavBar";
import * as AllHair from "./AssembledBody/BodyParts/hair";
import * as AllEyebrowAndNose from "./AssembledBody/BodyParts/eyebrowAndNose";
import * as AllMouth from "./AssembledBody/BodyParts/mouth";

const tabsConfig = {
  skin: { title: "Pele", list: [] },
  tshirt: { title: "Camiseta", list: [] },
  hair: { title: "Cabelo", list: AllHair },
  mouth: { title: "Boca", list: AllMouth },
  eyebrowAndNose: {
    title: "Sobrancelha/Nariz",
    list: AllEyebrowAndNose,
  },
};

import "./App.css";

function App() {
  const [currentTab, setCurrentTab] = useState("hair");
  const [colorSettings, setColorSettings] = useState({
    hair: "#4D191A",
    skin: "#7C533E",
    background: "",
    tshirt: "#442178",
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
      <div className="content">
        <AssembledBody
          partsSettings={partsSettings}
          colorSettings={colorSettings}
        />
        <h2>Editar</h2>
        <NavBar
          tabsConfig={tabsConfig}
          currentTab={currentTab}
          changeCurrentTab={(v) => setCurrentTab(v)}
        />
        {["skin", "tshirt", "hair"].includes(currentTab) && (
          <div className="colorPickerWrapper">
            <ColorPicker
              type={currentTab === "hair" ? "slider" : ""}
              colorKey={currentTab}
              currentColor={colorSettings.hair}
              changeCurrentColor={(value) =>
                changeColorSettings(currentTab, value)
              }
            />
          </div>
        )}
        <Options
          tabsConfig={tabsConfig}
          currentTab={currentTab}
          partsSettings={partsSettings}
          changeConfigs={(v) => setConfigs(v)}
        />
      </div>
    </div>
  );
}

export default App;
