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
  const [selectedComponents, setSelectedComponents] = useState({});
  const [currentTypes, setCurrentTypes] = useState({});

  const assembleSuggestedComposition = () => {
    const avatar = {} as SVGComponent;

    Object.entries(localComponents.defaultComposition).forEach(([key, id]) => {
      if (!id) return;

      const component = components[key].components.find(
        (el: SVGComponent) => el.id === id
      );

      if (component.type)
        setCurrentTypes((currentValue) => ({
          ...currentValue,
          [key]: component.type,
        }));

      if (component.subcomponent) {
        if (key === "body") avatar["shadowHead"] = component.subcomponent;
        if (key === "hair") avatar["backHair"] = component.subcomponent;
      }
      avatar[key] = component;
    });

    setSelectedComponents({ ...avatar });
  };

  const getFirstCompatibleComponent = (key: string, type) => {
    const result = components[key].components.find(
      (component: SVGComponent) =>
        component.types && component.types.includes(type)
    );
    return result || "";
  };

  const validateMatchComponents = (
    componentsToCheck: string[],
    newComponent: SVGComponent
  ) => {
    componentsToCheck.forEach((keyComponent) => {
      if (
        selectedComponents[keyComponent] &&
        !selectedComponents[keyComponent]?.types.includes(newComponent.type)
      ) {
        selectedComponents[keyComponent] = ["eyebrow", "eyes"].includes(
          keyComponent
        )
          ? getFirstCompatibleComponent(keyComponent, newComponent.type)
          : "";
      }
    });
  };

  const handleChangeComposition =
    ({ key, id }: Record<"key" | "id", string>) =>
    () => {
      const changedComponents = {};

      const newComponent = components[key].components.find(
        (el: SVGComponent) => el.id === id
      );

      if (key === "body") {
        changedComponents["shadowHead"] = newComponent.subcomponent;
        validateMatchComponents(["clothes"], newComponent);
      }

      if (key === "head")
        validateMatchComponents(
          ["hair", "eyebrow", "eyes", "beard"],
          newComponent
        );

      if (key === "hair")
        changedComponents["backHair"] = newComponent.subcomponent;

      if (newComponent?.type)
        setCurrentTypes({ ...currentTypes, [key]: newComponent.type });

      changedComponents[key] = newComponent;
      setSelectedComponents({
        ...selectedComponents,
        ...changedComponents,
      });
    };

  useEffect(() => {
    assembleSuggestedComposition();
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
