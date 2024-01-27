import { useState } from "react";
import AssembledBody from "./AssembledBody";
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

  return (
    <div className="container">
      <div className="content">
        <AssembledBody currentTab={currentTab} tabsConfig={tabsConfig} />
        <h2>Editar</h2>
        <NavBar
          tabsConfig={tabsConfig}
          currentTab={currentTab}
          changeCurrentTab={(v) => setCurrentTab(v)}
        />
      </div>
      <div
        id="circle"
        className="demo"
        style={{ display: "none", position: "relative", width: "200px" }}
      >
        <svg viewBox="0 0 100 100">
          <path
            d="M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94"
            stroke="#eee"
            strokeWidth="0"
            fillOpacity="0"
          ></path>
          <path
            className="animatedPath"
            d="M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94"
            stroke="#FFEA82"
            strokeWidth="6"
            fillOpacity="0"
            style={{
              strokeDasharray: "295.416, 295.416",
              strokeDashoffset: "295.416",
            }}
          ></path>
        </svg>
      </div>
    </div>
  );
}

export default App;
