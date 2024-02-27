import React, { useState } from "react";
import avatarComponents from "../localComponents.json";

const tabList = Object.keys(avatarComponents);

const CustomOptions = () => {
  const [currentTab, setCurrentTab] = useState("background");

  const renderOption = (component) => {
    return (
      <div
        style={{ width: "150px", height: "150px", overflow: "hidden" }}
        key={currentTab + component.id}
        id={component.id}
      >
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
      </div>
    );
  };

  return (
    <div className="containerCustomOptions">
      current tab: {currentTab}
      <div className="tabs" style={{ display: "flex", width: "650px" }}>
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
      <div className="options" style={{ width: "650px" }}>
        {avatarComponents[currentTab].map((component) =>
          renderOption(component)
        )}
      </div>
    </div>
  );
};

export default CustomOptions;
