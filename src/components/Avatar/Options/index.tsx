import React, { useState } from "react";
import localComponents from "../localComponents.json";

const avatarComponents = localComponents.pieces;
const tabList = Object.keys(avatarComponents);
interface SVGComponent {
  svg: string;
  id: string;
  coordinates: Record<"x" | "y", number>;
  viewBox: "string";
  shadow?: Record<"svg", string> & Record<"x" | "y", number>;
  subcomponent?: Record<"svg", string> &
    Record<"x" | "y", number> &
    Record<"viewBox", string> &
    Record<"fullSvg", string>;
  compatibleTypes?: Array<string>;
}

type ChangeComposition = (params: Record<"key" | "id", string>) => void;

interface CustomOptionsProps {
  changeComposition: ChangeComposition;
  type: Record<string, string>;
}

const withRemoveOption = ["hair", "clothes", "beard", "glasses"];
const Options = ({ changeComposition, type }: CustomOptionsProps) => {
  const [currentTab, setCurrentTab] = useState("background");

  const handleChangeComposition =
    ({ key, id }: Record<"key" | "id", string>) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      changeComposition({ key, id });
    };

  const renderOption = (component: SVGComponent) => {
    let svg = component.svg;

    if (
      avatarComponents[currentTab].validationRequiredBy &&
      component.compatibleTypes &&
      !component.compatibleTypes.includes(
        type[avatarComponents[currentTab].validationRequiredBy]
      )
    )
      return;

    if (currentTab !== "body" && component?.subcomponent)
      svg = component.subcomponent?.fullSvg;

    return (
      <button
        type="button"
        style={{
          width: "150px",
          height: "150px",
          overflow: "hidden",
          cursor: "pointer",
        }}
        key={currentTab + component.id}
        id={component.id}
        onClick={handleChangeComposition({ key: currentTab, id: component.id })}
      >
        <svg
          width="100%"
          height="100%"
          viewBox={
            component?.subcomponent?.viewBox
              ? component?.subcomponent?.viewBox
              : component.viewBox
          }
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          dangerouslySetInnerHTML={{
            __html: svg,
          }}
        ></svg>
      </button>
    );
  };

  const renderRemoveOption = () => {
    return (
      <button
        type="button"
        style={{
          width: "150px",
          height: "150px",
          overflow: "hidden",
          cursor: "pointer",
        }}
        key="remove selected option"
        id="zero"
        onClick={handleChangeComposition({ key: currentTab, id: "" })}
      >
        <svg
          width="125"
          height="125"
          viewBox="0 0 125 125"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M62.5 120C94.2564 120 120 94.2564 120 62.5C120 30.7436 94.2564 5 62.5 5C30.7436 5 5 30.7436 5 62.5C5 94.2564 30.7436 120 62.5 120Z"
            stroke="black"
            strokeWidth="10"
          />
          <path
            d="M21.8672 21.8652L103.134 103.132"
            stroke="black"
            strokeWidth="10"
            strokeLinecap="round"
          />
        </svg>
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
        {withRemoveOption.includes(currentTab) && renderRemoveOption()}
        {avatarComponents[currentTab].components &&
          avatarComponents[currentTab].components.map(
            (component: SVGComponent) => renderOption(component)
          )}
      </div>
    </div>
  );
};

export default Options;
