import React, { useEffect, useState } from "react";
import Assembled from "./Assembled";
import CustomOptions from "./CustomOptions";

import components from "./localComponents.json";
import "./NewBody.css";
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

  const handleChangeComposition =
    ({ key, id }: Record<"key" | "id", string>) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const newComponent = components[key].find(
        (el: SVGComponent) => el.id === id
      );
      setSelectedComponents({ ...selectedComponents, [key]: newComponent });
    };

  const getComposition = () => {
    const avatar = {} as SVGComponent;

    Object.entries(suggestedComposition).forEach(([key, id]) => {
      const component = components[key].find(
        (el: SVGComponent) => el.id === id
      );
      if (key === "head" && component?.shadow) {
        avatar["shadowHead"] = component.shadow;
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
      <CustomOptions changeComposition={handleChangeComposition} />
    </div>
  );
};

export default NewBody;
