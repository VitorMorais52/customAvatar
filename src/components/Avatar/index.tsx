import React, { useEffect, useState } from "react";
import Assembled from "./Assembled";
import Options from "./Options";

import localComponents from "./localComponents.json";

import "./Avatar.css";
import {
  darkenColor,
  deepClone,
  validateMatchComponents,
} from "../../utils/functions";
import { SVGComponent } from "../../utils/models";

const components = deepClone(localComponents.pieces);

const Avatar = () => {
  const [selectedComponents, setSelectedComponents] = useState({});
  const [currentTypes, setCurrentTypes] = useState({});

  const [colorByKeys, setColorByKeys] = useState<Record<string, string[]>>({
    background: [],
    backHair: ["#1A1A1A"],
    body: [],
    shadowHead: [],
    head: [],
    eyebrow: [],
    hair: ["#1A1A1A"],
    eyes: [],
    mouth: [],
    nose: [],
    beard: [],
    glasses: [],
  });

  const handleChangeColor = (colorKey: string, colorsValue: string[]) => {
    const newSetColors = colorByKeys[colorKey] || [];

    const newColorByKeys: Record<string, string[]> = {
      ...colorByKeys,
      [colorKey]: colorsValue,
    };

    if (colorKey === "hair") newColorByKeys["backHair"] = colorsValue;
    if (colorKey === "body") {
      newColorByKeys["head"] = colorsValue;

      newColorByKeys["nose"] = [darkenColor(colorsValue[0], 50)];
      newColorByKeys["shadowHead"] = [darkenColor(colorsValue[0], 30)];
    }
    setColorByKeys(newColorByKeys);
  };

  const changeComposition = ({ key, id }: Record<"key" | "id", string>) => {
    const changedComponents = {};

    const newComponent = components[key].components.find(
      (el: SVGComponent) => el.id === id
    );

    if (key === "body") {
      changedComponents["shadowHead"] = newComponent.subcomponent;
      validateMatchComponents(
        components,
        selectedComponents,
        ["clothes"],
        newComponent
      );
    }

    if (key === "head")
      validateMatchComponents(
        components,
        selectedComponents,
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
        currentComponents={selectedComponents}
        changeComponentsColor={handleChangeColor}
      />
    </div>
  );
};

export default Avatar;
