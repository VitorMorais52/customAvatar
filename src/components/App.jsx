import { useState } from "react";
import AssembledBody from "./AssembledBody";
import NewBody from "./NewBody";
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
      <div className="content" style={{ display: "flex" }}>
        <AssembledBody currentTab={currentTab} tabsConfig={tabsConfig} />
        <h2>Editar</h2>
        <NavBar
          tabsConfig={tabsConfig}
          currentTab={currentTab}
          changeCurrentTab={(v) => setCurrentTab(v)}
        />
      </div>
      <NewBody />
      {/* <svg
        width="1000"
        height="1000"
        viewBox="0 0 1000 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M500 999.997C776.142 999.997 1000 776.14 1000 499.999C1000 223.857 776.142 0 500 0C223.858 0 0 223.857 0 499.999C0 776.14 223.858 999.997 500 999.997Z"
          fill="#FFDDC9"
        />
        <path
          d="M500 899.995C720.914 899.995 900 720.91 900 499.997C900 279.084 720.914 99.998 500 99.998C279.086 99.998 100 279.084 100 499.997C100 720.91 279.086 899.995 500 899.995Z"
          fill="#FFE6D8"
        />
        <path
          d="M507.778 221.53C485.994 68.4205 386.15 0 278.78 0C171.41 0 71.5669 68.4205 49.7822 221.53C22.2826 221.53 0 257.194 0 301.182C0 343.138 20.3311 377.149 46.0784 380.236C70.4318 512.636 165.257 589.918 278.78 589.918C392.284 589.918 487.129 512.636 511.462 380.236C537.229 377.149 557.561 343.138 557.561 301.182C557.561 257.194 535.278 221.53 507.778 221.53Z"
          fill="#B56B63"
        />
        <path
          d="M204.5 174.5L197 158.5L231.5 149V0H532V149L566 158.5C561.264 170.548 558.042 177.202 549.5 188.5C542.256 198.469 527.5 212 527.5 212C527.5 212 513.299 224.944 501.5 231.5C487.031 239.052 461 248.5 461 248.5C461 248.5 435.824 256.197 419 258.5C401.053 260.294 390.942 260.848 373 260.5C357.045 260.242 348.308 259.236 333 256.5L332.525 256.406C318.661 253.669 310.762 252.11 296.5 247C284.009 242.614 277.048 239.481 264.5 232.5C253.165 226.433 246.938 220.92 238 214C229.062 207.08 224.535 202.839 217.5 194.5C217.5 194.5 208.402 182.319 204.5 174.5Z"
          fill="#B56B63"
        />
        <path
          d="M95.5921 298.5C50.3559 267.949 -2.5064 213.039 0.0920916 211.5C2.69059 209.961 230.592 148 230.592 148H532.092L763.092 211.5C741.672 237.339 727.904 250.96 700.592 274C677.206 293.082 663.475 302.931 637.092 318.5C607.288 335.867 590.377 344.114 557.592 356.5C522.678 369.549 502.466 374.901 465.592 381.5C433.796 386.466 415.283 387.884 381.592 389C358.023 388.441 344.182 387.52 318.592 385C278.876 380.526 256.816 375.169 218.092 361C164.042 343.832 141.734 329.222 95.5921 298.5Z"
          fill="#B56B63"
        />
      </svg> */}
    </div>
  );
}

export default App;
