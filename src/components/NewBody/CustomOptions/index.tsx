import React, { useState } from "react";
import avatarComponents from "../localComponents.json";

const tabList = Object.keys(avatarComponents);
interface SVGComponent {
  svg: string;
  id: string;
  coordinates: Record<"x" | "y", number>;
  viewBox: "string";
  shadow?: Record<"svg", string> | Record<"x" | "y", number>;
}

type ChangeComposition = (
  params: Record<"key" | "id", string>
) => (event: React.MouseEvent<HTMLButtonElement>) => void;

interface CustomOptionsProps {
  changeComposition: ChangeComposition;
}

const CustomOptions = ({ changeComposition }: CustomOptionsProps) => {
  const [currentTab, setCurrentTab] = useState("background");

  const renderOption = (component: SVGComponent) => {
    return (
      <button
        type="button"
        style={{ width: "150px", height: "150px", overflow: "hidden" }}
        key={currentTab + component.id}
        id={component.id}
        onClick={changeComposition({ key: currentTab, id: component.id })}
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
      </button>
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
        {avatarComponents[currentTab].map((component: SVGComponent) =>
          renderOption(component)
        )}
      </div>
    </div>
  );
};

export default CustomOptions;
