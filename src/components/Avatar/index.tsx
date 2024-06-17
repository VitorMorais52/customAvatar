import React, { useEffect, useRef, useState } from "react";
import AssembledAvatar from "./Assembled";
import ComponentOptions from "./Options";

import {
  darkenColor,
  deepClone,
  validateMatchComponents,
  restoreLastColor,
  updateFillProp,
} from "../../utils/functions";

import { IComponent } from "../../utils/models";

import {
  defaultComposition,
  pieces,
  skin,
  traffictOrder,
  commonColors,
  skinColors,
} from "./newLocalComponents.json";

const components = deepClone(pieces);
const filteredTraffictOrder = traffictOrder.filter(
  (key) => !["set"].includes(key)
);

import "./Avatar.css";

const Avatar = () => {
  const [selectedComponents, setSelectedComponents] = useState({});
  const [currentComponentsType, setCurrentComponentsType] = useState({});
  useState<Record<string, string>>();
  const [inputDataReceive, setInputDataReceive] = useState(
    '[["0"],["0"],["0"],["1"],["3"],["17"],["1"],["0"],["0"],null,null,null]'
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const changeComponentColor = (key: string, index: number, color: string) => {
    if (color === "#000000") return;

    if (key === "skin") {
      Object.entries(skin.relatedComponents).forEach(([relatedKey, value]) => {
        const rightColor = value ? darkenColor(color, value) : color;

        updateFillProp(selectedComponents[relatedKey], index, rightColor);
      });
    } else {
      updateFillProp(selectedComponents[key], index, color);

      if (selectedComponents[key].subcomponent) {
        const { subcomponentKey } = pieces[key];
        updateFillProp(selectedComponents[subcomponentKey], index, color);
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
      const { svg, subcomponent } = newComponent;

      const currentComponent = selectedComponents[key];

      if (
        currentComponent &&
        ((!newComponent.isNotEditable && !currentComponent.isNotEditable) ||
          typeof skin.relatedComponents[key] === "object")
      ) {
        restoreLastColor(svg, currentComponent);
        if (subcomponent) restoreLastColor(subcomponent.svg, currentComponent);
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
    } else {
      changedComponents[key] = "";
      if (components[key].subcomponentKey) {
        changedComponents[components[key].subcomponentKey] = "";
      }
    }

    setSelectedComponents({
      ...selectedComponents,
      ...changedComponents,
    });
  };

  const assembleDefaultAvatarComposition = () => {
    if (!defaultComposition) return;

    const avatar = {} as IComponent;

    const recipe = inputDataReceive
      ? JSON.parse(inputDataReceive).slice(1)
      : defaultComposition.slice(1);

    filteredTraffictOrder.forEach((key, keyIndex) => {
      const componentInfos = recipe[keyIndex];
      if (!componentInfos) return;

      const componentIndex = componentInfos[0];
      if (!componentIndex) return;

      avatar[key] = components[key].components[componentIndex] || "";

      if (avatar[key].subcomponent) {
        avatar[components[key].subcomponentKey] = avatar[key].subcomponent;
      }

      const componentColors = componentInfos.slice(1);
      componentColors.forEach((color: string, indexColor: number) => {
        if (
          avatar[key] &&
          avatar[key].svg[indexColor] &&
          !avatar[key].svg[indexColor].isNotEditable &&
          color
        ) {
          updateFillProp(avatar[key], indexColor, color);
          if (avatar[key].subcomponent) {
            if (skin.relatedComponents[components[key].subcomponentKey]) {
              const value =
                skin.relatedComponents[components[key].subcomponentKey];

              const rightColor = value ? darkenColor(color, value) : color;

              if (avatar[components[key].subcomponentKey])
                updateFillProp(
                  avatar[components[key].subcomponentKey],
                  indexColor,
                  rightColor
                );
            } else updateFillProp(avatar[key].subcomponent, indexColor, color);
          }
        }
      });

      if (avatar[key].type)
        setCurrentComponentsType((currentValue) => ({
          ...currentValue,
          [key]: avatar[key].type,
        }));
    });

    setSelectedComponents({ ...avatar });
  };

  const getOutpatData = () => {
    const result = filteredTraffictOrder.map((key) => {
      const item = selectedComponents[key];

      if (!item || !item.id) {
        return null;
      }

      const componentIndex = components[key].components.findIndex(
        (component) => component.id === item.id
      );

      const currentComponent = components[key].components[componentIndex];
      const colors = currentComponent.svg.map(
        (svgElement) => svgElement.props.fill || null
      );

      return [componentIndex + "", ...colors];
    });

    return JSON.stringify([["0"], ...result] || []);
  };

  const handleCopy = async () => {
    if (textareaRef.current) {
      try {
        await navigator.clipboard.writeText(textareaRef.current.value);
        alert("Texto copiado!");
      } catch (err) {
        console.error("Falha ao copiar texto: ", err);
      }
    }
  };

  useEffect(() => {
    assembleDefaultAvatarComposition();
    if (inputRef.current) inputRef.current.value = inputDataReceive;
  }, [inputDataReceive]);

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
        avatarComponents={pieces}
        changeComposition={changeAvatarComposition}
        currentTypes={currentComponentsType}
        currentComponents={selectedComponents}
        changeComponentsColor={changeComponentColor}
        availableColors={{ commonColors, skinColors }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "16px",
        }}
      >
        <textarea
          ref={textareaRef}
          style={{ width: "800px", height: "16px" }}
          value={getOutpatData()}
          readOnly
        />
        <button style={{ height: "fit-content" }} onClick={handleCopy}>
          Copiar
        </button>
      </div>
    </div>
  );
};

export default Avatar;
