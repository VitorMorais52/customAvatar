import React, { useState } from "react";
import avatarComponents from "../localComponents.json";

const tabList = Object.keys(avatarComponents);

const CustomOptions = () => {
  const [currentTab, setCurrentTab] = useState("head");

  const renderOption = (component) => {
    return (
      <svg
        width="100%"
        height="100%"
        viewBox={component.viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        dangerouslySetInnerHTML={{
          __html: component.svg,
        }}
      ></svg>
    );
  };

  return (
    <div className="containerCustomOptions">
      current tab: {currentTab}
      <div className="tabs" style={{ display: "flex", width: "637px" }}>
        {tabList.map((tabTitle) => (
          <button
            style={{ margin: "4px" }}
            key={tabTitle}
            onClick={() => setCurrentTab(tabTitle)}
          >
            {tabTitle}
          </button>
        ))}
      </div>
      <div className="options" style={{ width: "637px" }}>
        {avatarComponents[currentTab].map((component) => (
          <div
            style={{ width: "150px", height: "150px", overflow: "hidden" }}
            key={currentTab + component.id}
          >
            {renderOption(component)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomOptions;
