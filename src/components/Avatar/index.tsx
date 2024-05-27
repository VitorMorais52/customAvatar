import React, { useEffect, useState } from "react";
import AssembledAvatar from "./Assembled";
import ComponentOptions from "./Options";

import { deepClone, validateMatchComponents } from "../../utils/functions";

import { IComponent, SVGElement } from "../../utils/models";

import { defaultComposition, pieces, skin } from "./newLocalComponents.json";
const components = deepClone(pieces);

import "./Avatar.css";

const Avatar = () => {
  const [selectedComponents, setSelectedComponents] = useState({});
  const [currentComponentsType, setCurrentComponentsType] = useState({});

  const [colorByKeys, setColorByKeys] = useState<Record<string, string[]>>({
    background: [],
    backHair: [],
    shadowHead: [],
    eyebrow: [],
    hair: [],
    eyes: [],
    mouth: [],
    beard: [],
    glasses: [],
    clothes: [],
    skin: [],
  });

  const changeComponentColor = (key: string, index: number, color: string) => {
    if (color === "#000000") return;
    const newColors = colorByKeys[color] || [];

    newColors[index] = color;

    const newColorByKeys: Record<string, string[]> = {
      ...colorByKeys,
      [color]: newColors,
    };

    if (components[color]?.subcomponentKey)
      newColorByKeys[components[key].subcomponentKey] = newColors;
    setColorByKeys(newColorByKeys);
  };

  const changeAvatarComposition = ({
    componentKey: key,
    componentId: id,
  }: Record<"componentKey" | "componentId", string>) => {
    const changedComponents = {};
    const {
      components: componentList,
      subcomponentKey,
      validateMatchComponents: arrMatchComponents,
    } = components[key];

    if (id) {
      const newComponent = componentList.find((el: IComponent) => el.id === id);

      if (subcomponentKey) {
        changedComponents[components[key].subcomponentKey] =
          newComponent.subcomponent;
      }

      if (arrMatchComponents) {
        validateMatchComponents(
          components,
          selectedComponents,
          arrMatchComponents,
          newComponent
        );
      }

      if (newComponent?.type) {
        setCurrentComponentsType({
          ...currentComponentsType,
          [key]: newComponent.type,
        });
      }

      const colorsFromThisComponent: Record<string, string[]> = {};

      colorsFromThisComponent[key] = [];
      newComponent.svg.forEach((element: SVGElement, index: number) => {
        if (element.props.fill)
          colorsFromThisComponent[key].push(element.props.fill);
      });

      if (subcomponentKey) {
        colorsFromThisComponent[subcomponentKey] = [];
        newComponent?.subcomponent?.svg.forEach((element: SVGElement) => {
          if (element.props.fill)
            colorsFromThisComponent[subcomponentKey].push(element.props.fill);
        });
      }

      changedComponents[key] = newComponent;
      setColorByKeys((c) => ({ ...c, ...colorsFromThisComponent }));
    } else changedComponents[key] = "";

    setSelectedComponents({
      ...selectedComponents,
      ...changedComponents,
    });
  };

  const assembleDefaultAvatarComposition = () => {
    const avatar = {} as IComponent;
    const colors = deepClone(colorByKeys);

    colors.skin = [skin.color];

    Object.entries(defaultComposition).forEach(([key, id]) => {
      if (!id) return;

      const { components: componentList, subcomponentKey } = components[key];

      const component = componentList.find((el: IComponent) => el.id === id);
      const { subcomponent, type } = component;

      if (subcomponent) {
        avatar[subcomponentKey] = subcomponent;

        colors[subcomponentKey] = [];

        subcomponent?.svg.forEach((element: SVGElement) => {
          if (element.props.fill)
            colors[subcomponentKey].push(element.props.fill);
        });
      }

      colors[key] = [];
      component.svg.forEach((element: SVGElement) => {
        if (element.props.fill) colors[key].push(element.props.fill);
      });

      if (type)
        setCurrentComponentsType((currentValue) => ({
          ...currentValue,
          [key]: type,
        }));

      avatar[key] = component;
    });

    setColorByKeys(colors);
    setSelectedComponents({ ...avatar });
  };

  useEffect(() => {
    assembleDefaultAvatarComposition();
  }, []);

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
