import React, { useEffect, useState } from "react";
import Assembled from "./Assembled";
import Options from "./Options";

import localComponents from "./newLocalComponents.json";

import "./Avatar.css";
import {
  darkenColor,
  deepClone,
  validateMatchComponents,
} from "../../utils/functions";
import { SVGComponent } from "../../utils/models";

const components = deepClone(localComponents.pieces);

type SVGElement = {
  t: string;
  props: Record<string, string>;
};

const Avatar = () => {
  const [selectedComponents, setSelectedComponents] = useState({});
  const [currentTypes, setCurrentTypes] = useState({});

  const [colorByKeys, setColorByKeys] = useState<Record<string, string[]>>({
    background: [],
    backHair: [],
    body: [],
    shadowHead: [],
    head: [],
    eyebrow: [],
    hair: [],
    eyes: [],
    mouth: [],
    nose: [],
    beard: [],
    glasses: [],
    clothes: [],
  });

  const handleChangeColor = (
    colorKey: string,
    indexColor: number,
    newColor: string
  ) => {
    if (newColor === "#000000") return;

    const newColors = colorByKeys[colorKey] || [];

    newColors[indexColor] = newColor;

    const newColorByKeys: Record<string, string[]> = {
      ...colorByKeys,
      [colorKey]: newColors,
    };

    if (colorKey === "hair") newColorByKeys["backHair"] = newColors;
    if (colorKey === "body") {
      newColorByKeys["head"] = newColors;

      newColorByKeys["nose"] = [darkenColor(newColors[0], 50)];
      newColorByKeys["shadowHead"] = [darkenColor(newColors[0], 30)];
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

    const colorsFromThisComponent: string[] = [];

    newComponent.svg.forEach((element: SVGElement) => {
      if (element.props.fill) colorsFromThisComponent.push(element.props.fill);
    });
    setColorByKeys((c) => ({ ...c, [key]: colorsFromThisComponent }));

    setSelectedComponents({
      ...selectedComponents,
      ...changedComponents,
    });
  };

  const assembleSuggestedComposition = () => {
    const avatar = {} as SVGComponent;
    const colorsFromComponent = deepClone(colorByKeys);

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

      colorsFromComponent[key] = [];
      component.svg.forEach((element: SVGElement) => {
        if (element.props.fill)
          colorsFromComponent[key].push(element.props.fill);
      });

      avatar[key] = component;
    });

    setColorByKeys(colorsFromComponent);
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
