import React, { useState } from "react";
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

function BetaCustom() {
  const [currentTab, setCurrentTab] = useState("hair");

  return (
    <div className="container">
      <div className="content">
        <NavBar
          tabsConfig={tabsConfig}
          currentTab={currentTab}
          changeCurrentTab={(v) => setCurrentTab(v)}
        />
        <AssembledBody currentTab={currentTab} tabsConfig={tabsConfig} />
        <h2>Editar</h2>
      </div>
    </div>
  );
}

export default BetaCustom;
