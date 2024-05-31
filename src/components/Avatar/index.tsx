import React, { useEffect, useRef, useState } from "react";
import AssembledAvatar from "./Assembled";
import ComponentOptions from "./Options";

import {
  darkenColor,
  deepClone,
  validateMatchComponents,
} from "../../utils/functions";

import { IComponent, SVGElement } from "../../utils/models";

import { dataReceived, pieces, skin } from "./newLocalComponents.json";
dataReceived.shift();
const components = deepClone(pieces);

import "./Avatar.css";

const Avatar = () => {
  const [selectedComponents, setSelectedComponents] = useState({});
  const [currentComponentsType, setCurrentComponentsType] = useState({});
  const [startComposition, setStartComposition] =
    useState<Record<string, string>>();
  const [inputDataReceive, setInputDataReceive] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

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

  function createDefaultComposition() {
    const keysOrder = [
      "background",
      "body",
      "head",
      "eyebrow",
      "hair",
      "eyes",
      "mouth",
      "nose",
      "clothes",
      "beard",
      "glasses",
    ];

    let defaultComposition = {};

    const recipe = inputRef?.current?.value
      ? JSON.parse(inputRef?.current?.value)
      : dataReceived;

    keysOrder.forEach((key, index) => {
      if (recipe[index] === null) {
        defaultComposition[key] = "";
      } else {
        defaultComposition[key] = recipe[index]?.[0] || "";
      }
    });

    setStartComposition(defaultComposition);
    return defaultComposition;
  }

  const assembleDefaultAvatarComposition = () => {
    const avatar = {} as IComponent;

    if (!startComposition) return;

    Object.entries(startComposition).forEach(([key, id]) => {
      if (!id) return;

      const { components: componentList, subcomponentKey } = components[key];

      const component = componentList[+id];

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
    if (!startComposition || inputDataReceive) createDefaultComposition();

    if (inputRef.current && !inputRef.current.value)
      inputRef.current.value = JSON.stringify(dataReceived);
  }, [inputDataReceive]);

  useEffect(() => {
    if (startComposition && Object.values(startComposition).length)
      assembleDefaultAvatarComposition();
  }, [startComposition]);

  return (
    <div>
      <input
        type="text"
        ref={inputRef}
        style={{ width: "800px", marginBottom: "16px" }}
      />
      <button
        type="submit"
        onClick={() => {
          if (!inputRef.current) return;
          setInputDataReceive(inputRef.current.value);
        }}
      >
        save
      </button>
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
