import React, { useEffect, useState } from "react";
import Assembled from "./Assembled";
import Options from "./Options";

import localComponents from "./localComponents.json";

import "./Avatar.css";
import { deepClone } from "../../utils/functions";

const components = deepClone(localComponents.pieces);
interface SVGComponent {
  svg: string;
  id: string;
  viewBox: "string";
  type?: string;
  compatibleTypes?: string[];
  coordinates: Record<"x" | "y", number>;
  shadow?: Record<"svg", string> & Record<"x" | "y", number>;
  subcomponent?: Record<"svg", string> &
    Record<"x" | "y", number> &
    Record<"viewBox", string> &
    Record<"fullSvg", string>;
}

const Avatar = () => {
  const [selectedComponents, setSelectedComponents] = useState({});
  const [currentTypes, setCurrentTypes] = useState({});

  const [colorByKeys, setColorByKeys] = useState({
    background: "",
    backHair: "#000",
    body: "",
    shadowHead: "",
    head: "",
    eyebrow: "",
    hair: "#000",
    eyes: "",
    mouth: "",
    nose: "",
    beard: "",
    glasses: "",
  });

  const handleChangeColor = (colorKey: string, value: string) => {
    const newColorByKeys = { ...colorByKeys, [colorKey]: value };
    if (colorKey === "hair") newColorByKeys["backHair"] = value;

    setColorByKeys(newColorByKeys);
  };

  const validateMatchComponents = (
    componentsToCheck: string[],
    newComponent: SVGComponent
  ) => {
    componentsToCheck.forEach((keyComponent) => {
      if (
        selectedComponents[keyComponent] &&
        !selectedComponents[keyComponent]?.compatibleTypes.includes(
          newComponent.type
        )
      ) {
        selectedComponents[keyComponent] = ["eyebrow", "eyes"].includes(
          keyComponent
        )
          ? getFirstCompatibleComponent(keyComponent, newComponent.type)
          : "";

        if (keyComponent === "hair") selectedComponents["backHair"] = "";
      }
    });
  };

  const changeComposition = ({ key, id }: Record<"key" | "id", string>) => {
    const changedComponents = {};
    const newComponent = components[key].components.find(
      (el: SVGComponent) => el.id === id
    );

    if (key === "body") {
      changedComponents["shadowHead"] = newComponent.subcomponent;
      validateMatchComponents(["clothes"], newComponent);
    }

    if (key === "head")
      validateMatchComponents(
        ["hair", "eyebrow", "eyes", "beard"],
        newComponent
      );

    if (key === "hair")
      changedComponents["backHair"] = newComponent.subcomponent;

    if (newComponent?.type)
      setCurrentTypes({ ...currentTypes, [key]: newComponent.type });

    changedComponents[key] = newComponent;
    setSelectedComponents({
      ...selectedComponents,
      ...changedComponents,
    });
  };

  const assembleSuggestedComposition = () => {
    const avatar = {} as SVGComponent;

    Object.entries(localComponents.defaultComposition).forEach(([key, id]) => {
      if (!id) return;

      const component = components[key].components.find(
        (el: SVGComponent) => el.id === id
      );

      if (component.type)
        setCurrentTypes((currentValue) => ({
          ...currentValue,
          [key]: component.type,
        }));

      if (component.subcomponent) {
        if (key === "body") avatar["shadowHead"] = component.subcomponent;
        if (key === "hair") avatar["backHair"] = component.subcomponent;
      }
      avatar[key] = component;
    });

    setSelectedComponents({ ...avatar });
  };

  const getFirstCompatibleComponent = (key: string, type) => {
    const result = components[key].components.find(
      (component: SVGComponent) =>
        component.compatibleTypes && component.compatibleTypes.includes(type)
    );
    return result || "";
  };

  useEffect(() => {
    assembleSuggestedComposition();
  }, []);

  return (
    <div>
      <Assembled
        defaultComposition={selectedComponents}
        colorByKeys={colorByKeys}
        type={currentTypes}
      />
      <Options
        changeComposition={changeComposition}
        type={currentTypes}
        colorByKeys={colorByKeys}
        changeComponentsColor={handleChangeColor}
      />
    </div>
  );
};

export default Avatar;
