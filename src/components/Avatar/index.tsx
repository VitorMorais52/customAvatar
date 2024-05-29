import React, { useEffect, useState } from "react";
import AssembledAvatar from "./Assembled";
import ComponentOptions from "./Options";

import {
  darkenColor,
  deepClone,
  validateMatchComponents,
} from "../../utils/functions";

import { IComponent, SVGElement } from "../../utils/models";

import { defaultComposition, pieces, skin } from "./newLocalComponents.json";
const components = deepClone(pieces);

import "./Avatar.css";

const Avatar = () => {
  const [selectedComponents, setSelectedComponents] = useState({});
  const [currentComponentsType, setCurrentComponentsType] = useState({});

  const changeComponentColor = (key: string, index: number, color: string) => {
    if (color === "#000000") return;

    if (key === "skin") {
      Object.entries(skin.relatedComponents).forEach(([relatedKey, value]) => {
        const { increase } = value;

        selectedComponents[relatedKey].svg[0].props.fill = increase
          ? darkenColor(color, increase)
          : color;
      });
    } else {
      selectedComponents[key].svg[index].props.fill = color;

      if (selectedComponents[key].subcomponent) {
        const { subcomponentKey } = pieces[key];
        selectedComponents[subcomponentKey].svg[index].props.fill = color;
      }
    }

    setSelectedComponents({
      ...selectedComponents,
    });
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
      const currentComponent = selectedComponents[key];

      //maintain last hair color. Should it be in json?
      if (currentComponent && key === "hair") {
        newComponent.svg.forEach((element, index) => {
          if (currentComponent.svg[index])
            element.props.fill = currentComponent.svg[index].props.fill;
        });
        if (newComponent.subcomponent) {
          newComponent.subcomponent.svg.forEach((element, index) => {
            if (currentComponent.svg[index])
              element.props.fill = currentComponent.svg[index].props.fill;
          });
        }
      }

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

      changedComponents[key] = newComponent;
    } else changedComponents[key] = "";

    setSelectedComponents({
      ...selectedComponents,
      ...changedComponents,
    });
  };

  const assembleDefaultAvatarComposition = () => {
    const avatar = {} as IComponent;

    Object.entries(defaultComposition).forEach(([key, id]) => {
      if (!id) return;

      const { components: componentList, subcomponentKey } = components[key];

      const component = componentList.find((el: IComponent) => el.id === id);
      const { subcomponent, type } = component;

      if (subcomponent) {
        avatar[subcomponentKey] = subcomponent;
      }

      if (type)
        setCurrentComponentsType((currentValue) => ({
          ...currentValue,
          [key]: type,
        }));

      avatar[key] = component;
    });

    setSelectedComponents({ ...avatar });
  };

  useEffect(() => {
    assembleDefaultAvatarComposition();
  }, []);

  return (
    <div>
      <AssembledAvatar
        avatarComposition={selectedComponents}
        currentTypes={currentComponentsType}
      />
      <ComponentOptions
        changeComposition={changeAvatarComposition}
        currentTypes={currentComponentsType}
        currentComponents={selectedComponents}
        changeComponentsColor={changeComponentColor}
      />
    </div>
  );
};

export default Avatar;
