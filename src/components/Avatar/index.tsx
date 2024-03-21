//ver forma de escalar o json futuramente

import React, { useEffect, useState } from "react";
import Assembled from "./Assembled";
import Options from "./Options";

import localComponents from "./localComponents.json";

import "./Avatar.css";
interface SVGComponent {
  svg: string;
  id: string;
  viewBox: "string";
  type?: string;
  types?: string[];
  coordinates: Record<"x" | "y", number>;
  shadow?: Record<"svg", string> | Record<"x" | "y", number>;
}

const Avatar = () => {
  const components = localComponents.pieces;
  const suggestedComposition = {
    background: "one",
    backHair: "",
    body: "one",
    head: "one",
    hair: "one",
    eyebrow: "one",
    eyes: "one",
    nose: "one",
    mouth: "one",
    clothes: "",
  };
  const [selectedComponents, setSelectedComponents] = useState({});
  const [currentTypes, setCurrentTypes] = useState({});

  // must work according to the replaced component
  // const validateComposition = () => {}

  const getFirstCompatibleComponent = (key: string, type) => {
    const result = components[key].components.find(
      (component: SVGComponent) =>
        component.types && component.types.includes(type)
    );
    return result || "";
  };

  const getComposition = () => {
    const avatar = {} as SVGComponent;
    let shadowHead = {} as SVGComponent;
    let backHair = {} as SVGComponent;

    Object.entries(suggestedComposition).forEach(([key, id]) => {
      if (!id) return;

      const component = components[key].components.find(
        (el: SVGComponent) => el.id === id
      );
      if (component.shadow) {
        shadowHead = component.shadow;
      }
      if (component.type) {
        setCurrentTypes((currentValue) => ({
          ...currentValue,
          [key]: component.type,
        }));
      }
      if (component.backHair) {
        backHair = component.backHair;
      }
      avatar[key] = component;
      if (key === "body" && shadowHead) avatar["shadowHead"] = shadowHead;
      if (key === "hair" && backHair) avatar["backHair"] = backHair;
    });

    setSelectedComponents({ ...avatar });
  };

  const handleChangeComposition =
    ({ key, id }: Record<"key" | "id", string>) =>
    () => {
      console.info("called", { key, id });
      const changedComponents = {};

      const newComponent = components[key].components.find(
        (el: SVGComponent) => el.id === id
      );

      if (key === "body") {
        changedComponents["shadowHead"] = newComponent.shadow;
        if (
          selectedComponents["clothes"] &&
          !selectedComponents["clothes"]?.types.includes(newComponent.type)
        )
          selectedComponents["clothes"] = "";
      }

      if (key === "head") {
        if (
          selectedComponents["eyebrow"] &&
          !selectedComponents["eyebrow"]?.types.includes(newComponent.type)
        ) {
          selectedComponents["eyebrow"] = getFirstCompatibleComponent(
            "eyebrow",
            newComponent.type
          );
        }

        if (
          selectedComponents["hair"] &&
          !selectedComponents["hair"]?.types.includes(newComponent.type)
        ) {
          selectedComponents["hair"] = "";
        }
      }

      if (key === "hair") {
        changedComponents["backHair"] = newComponent
          ? newComponent.backHair
          : "";
      }

      changedComponents[key] = newComponent;

      setSelectedComponents({
        ...selectedComponents,
        ...changedComponents,
      });

      if (newComponent?.type)
        setCurrentTypes({ ...currentTypes, [key]: newComponent.type });
    };

  useEffect(() => {
    getComposition();
  }, []);

  return (
    <div>
      <Assembled defaultComposition={selectedComponents} type={currentTypes} />
      <Options
        changeComposition={handleChangeComposition}
        type={currentTypes}
      />
    </div>
  );
};

export default Avatar;

// sem roupa
// componentes de acordo com o head e o body 50% (tem sobrancelha, falta olhos)
// fazer funcionar os cabelos multicamadas 0
// cabelos troll q n servem em nd 0
// 6, 7, 8, 10, 12, 13 100%
// quando trocar de cabeça, remover o cabelo caso n tenha a adaptação
// testar a ideia de subcomponent ao inves de shadow/backhair
// adicionar sistema de cores
