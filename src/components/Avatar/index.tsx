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
  coordinates: Record<"x" | "y", number>;
  shadow?: Record<"svg", string> | Record<"x" | "y", number>;
}

const Avatar = () => {
  const components = localComponents.pieces;
  const suggestedComposition = {
    background: "one",
    body: "one",
    head: "one",
    hair: "one",
    eyebrow: "one",
    eyes: "one",
    nose: "one",
    mouth: "one",
    clothes: "one",
  };
  const [selectedComponents, setSelectedComponents] = useState({});
  const [currentTypes, setCurrentTypes] = useState({ head: "", body: "" });

  const handleChangeComposition =
    ({ key, id }: Record<"key" | "id", string>) =>
    () => {
      const newComponent = components[key].components.find(
        (el: SVGComponent) => el.id === id
      );

      if (Object.hasOwnProperty.call(newComponent, "type"))
        //validar e remover o componente com ref se necessario
        console.info(`validar a piece que tem ref=${key}`);

      setSelectedComponents({ ...selectedComponents, [key]: newComponent });

      if (newComponent.type)
        setCurrentTypes({ ...currentTypes, [key]: newComponent.type });
    };

  const getComposition = () => {
    const avatar = {} as SVGComponent;

    Object.entries(suggestedComposition).forEach(([key, id]) => {
      const component = components[key].components.find(
        (el: SVGComponent) => el.id === id
      );
      if (component?.shadow) {
        avatar["shadowHead"] = component.shadow;
      }
      if (component.type) {
        setCurrentTypes({ ...currentTypes, [key]: component.type });
      }
      avatar[key] = component;
    });

    setSelectedComponents({ ...avatar });
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
// componentes de acordo com o head e o body 50%
// fazer funcionar os cabelos multicamadas 0
// cabelos troll q n servem em nd 0
// 6, 7, 8, 10, 12, 13 100%
// quando trocar de cabeça, remover o cabelo caso n tenha a adaptação
