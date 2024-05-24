import React, { useEffect, useState } from "react";
import AssembledAvatar from "./Assembled";
import ComponentOptions from "./Options";

import {
  darkenColor,
  deepClone,
  validateMatchComponents,
} from "../../utils/functions";

import { IComponent, SVGElement } from "../../utils/models";

import localComponents from "./newLocalComponents.json";
const components = deepClone(localComponents.pieces);

import "./Avatar.css";

const Avatar = () => {
  const [selectedComponents, setSelectedComponents] = useState({});
  const [currentComponentsType, setCurrentComponentsType] = useState({});

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

  const changeComponentColor = (
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

  const changeAvatarComposition = ({
    componentKey: key,
    componentId: id,
  }: Record<"componentKey" | "componentId", string>) => {
    const changedComponents = {};

    if (id) {
      const newComponent = components[key].components.find(
        (el: IComponent) => el.id === id
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
        setCurrentComponentsType({
          ...currentComponentsType,
          [key]: newComponent.type,
        });

      changedComponents[key] = newComponent;

      const colorsFromThisComponent: Record<string, string[]> = {};

      colorsFromThisComponent[key] = [];
      newComponent.svg.forEach((element: SVGElement) => {
        if (element.props.fill)
          colorsFromThisComponent[key].push(element.props.fill);
      });
      if (key === "hair") {
        colorsFromThisComponent.backHair = [];
        newComponent?.subcomponent?.svg.forEach((element: SVGElement) => {
          if (element.props.fill)
            colorsFromThisComponent.backHair.push(element.props.fill);
        });
      }

      setColorByKeys((c) => ({ ...c, ...colorsFromThisComponent }));
    } else changedComponents[key] = "";

    setSelectedComponents({
      ...selectedComponents,
      ...changedComponents,
    });
  };

  const assembleDefaultAvatarComposition = () => {
    const avatar = {} as IComponent;
    const colorsFromComponent = deepClone(colorByKeys);

    Object.entries(localComponents.defaultComposition).forEach(([key, id]) => {
      if (!id) return;

      const component = components[key].components.find(
        (el: IComponent) => el.id === id
      );

      if (component.type)
        setCurrentComponentsType((currentValue) => ({
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

      if (key === "hair") {
        colorsFromComponent.backHair = [];
        component?.subcomponent?.svg.forEach((element: SVGElement) => {
          if (element.props.fill)
            colorsFromComponent.backHair.push(element.props.fill);
        });
      }

      avatar[key] = component;
    });

    setColorByKeys(colorsFromComponent);
    setSelectedComponents({ ...avatar });
  };

  useEffect(() => {
    assembleDefaultAvatarComposition();
  }, []);

  useEffect(() => {
    console.info(colorByKeys);
  }, [colorByKeys]);

  return (
    <div>
      <AssembledAvatar
        avatarComposition={selectedComponents}
        colorByKeys={colorByKeys}
        currentTypes={currentComponentsType}
      />
      <ComponentOptions
        changeComposition={changeAvatarComposition}
        currentTypes={currentComponentsType}
        colorByKeys={colorByKeys}
        currentComponents={selectedComponents}
        changeComponentsColor={changeComponentColor}
      />
    </div>
  );
};

export default Avatar;
