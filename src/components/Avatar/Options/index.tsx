import React, { useState } from "react";

import ColorPicker from "../ColorPicker";

import { CustomOptionsProps, IComponent } from "../../../utils/models";
import { transformSVGObject } from "../../../utils/functions";

import localComponents from "../newLocalComponents.json";
const avatarComponents = localComponents.pieces;
const tabList = Object.keys(avatarComponents);

const withRemoveOption = ["hair", "clothes", "beard", "glasses"];

const Options = ({
  changeComposition,
  type,
  changeComponentsColor,
  colorByKeys,
  currentComponents,
}: CustomOptionsProps) => {
  const [currentTab, setCurrentTab] = useState("head");

  const handleChangeComposition =
    ({ key, id }: Record<"key" | "id", string>) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      changeComposition({ key, id });
    };

  const renderColorPicker = () => {
    const currentComponent = currentComponents[currentTab];

    if (currentComponent?.isNotEditable) return <></>;

    return colorByKeys[currentTab].map((elementColor, index) => {
      if (!currentComponent || currentComponent?.svg[index]?.isNotEditable)
        return <></>;

      return (
        <div className="colorPickerWrapper" key={elementColor}>
          <ColorPicker
            type={
              ["hair", "beard", "clothes"].includes(currentTab) ? "slider" : ""
            }
            colorKey={currentTab}
            currentColor={elementColor}
            changeCurrentColor={(value: string) =>
              changeComponentsColor(currentTab, index, value)
            }
          />
        </div>
      );
    });
  };

  const renderOption = (component: IComponent) => {
    const assembledComponent = transformSVGObject(component);
    let svg = assembledComponent.svg;

    if (
      avatarComponents[currentTab].validationRequiredBy &&
      assembledComponent.compatibleTypes &&
      !assembledComponent.compatibleTypes.includes(
        type[avatarComponents[currentTab].validationRequiredBy]
      )
    )
      return;

    if (currentTab !== "body" && assembledComponent?.subcomponent) {
      if (typeof assembledComponent.subcomponent?.fullSvg === "string")
        svg = assembledComponent.subcomponent?.fullSvg;
    }

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
    <>
      {renderColorPicker()}
      <div
        className="containerCustomOptions"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="tabs" style={{ display: "flex", margin: "0.5rem 0" }}>
          {tabList.map((tabTitle) => {
            if (avatarComponents[tabTitle].components.length <= 1) return <></>;
            return (
              <button
                style={{ margin: "4px" }}
                key={tabTitle}
                onClick={() => setCurrentTab(tabTitle)}
              >
                {tabTitle}
              </button>
            );
          })}
        </div>
        <div className="options" style={{ width: "650px" }}>
          {withRemoveOption.includes(currentTab) && renderRemoveOption()}
          {avatarComponents[currentTab].components &&
            avatarComponents[currentTab].components.map(
              (component: IComponent) => renderOption(component)
            )}
        </div>
      </div>
    </>
  );
};

export default Options;
