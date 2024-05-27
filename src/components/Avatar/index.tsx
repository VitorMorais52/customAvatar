import React, { useEffect, useState } from "react";
import AssembledAvatar from "./Assembled";
import ComponentOptions from "./Options";

import { deepClone, validateMatchComponents } from "../../utils/functions";

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

    if (components[colorKey]?.subcomponentKey)
      newColorByKeys[components[colorKey].subcomponentKey] = newColors;
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
    const colorsFromComponent = deepClone(colorByKeys);
    colorsFromComponent.skin = [localComponents.skin.color];

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
        avatar[components[key].subcomponentKey] = component.subcomponent;
      }

      colorsFromComponent[key] = [];
      component.svg.forEach((element: SVGElement) => {
        if (element.props.fill)
          colorsFromComponent[key].push(element.props.fill);
      });

      if (component.subcomponent) {
        colorsFromComponent[components[key].subcomponentKey] = [];
        component?.subcomponent?.svg.forEach((element: SVGElement) => {
          if (element.props.fill)
            colorsFromComponent[components[key].subcomponentKey].push(
              element.props.fill
            );
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
