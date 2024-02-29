import React, { useEffect, useState } from "react";
import Assembled from "./Assembled";
import Options from "./Options";

import components from "./localComponents.json";
import "./Avatar.css";
interface SVGComponent {
  svg: string;
  id: string;
  viewBox: "string";
  coordinates: Record<"x" | "y", number>;
  shadow?: Record<"svg", string> | Record<"x" | "y", number>;
}

const NewBody = () => {
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
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const newComponent = components[key].components.find(
        (el: SVGComponent) => el.id === id
      );
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
      if (key === "head" && component?.shadow) {
        avatar["shadowHead"] = component.shadow;
      }
      if (component.type) {
        setCurrentTypes({ ...currentTypes, [key]: component.type });
      }
      if (component) avatar[key] = component;
    });

    setSelectedComponents({ ...avatar });
  };

  useEffect(() => {
    getComposition();
  }, []);

  return (
    <div>
      <Assembled defaultComposition={selectedComponents} />
      <Options
        changeComposition={handleChangeComposition}
        type={currentTypes}
      />
    </div>
  );
};

export default NewBody;

// sem roupa
// componentes de acordo com o head e o body
// fazer funcionar os cabelos multicamadas
// cabelos troll q n servem em nd
// 6, 7, 8, 10, 12, 13
