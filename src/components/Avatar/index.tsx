import React, { useEffect, useState } from "react";
import Assembled from "./Assembled";
import Options from "./Options";

import localComponents from "./localComponents.json";

import "./Avatar.css";

interface IColors {
  index: number;
  currentColor: string;
  originalColor: string;
}

type TypeElementsColor = Record<"primary" | "secondary", IColors[]>;
type TypeElements = Record<"primary" | "secondary", string[]>;

interface SVGComponent {
  svg: string;
  id: string;
  viewBox: "string";
  type?: string;
  compatibleTypes?: string[];
  coordinates: Record<"x" | "y", number>;
  shadow?: Record<"svg", string> & Record<"x" | "y", number>;
  subcomponent?: Record<"svg", string> &
    Record<"x" | "y", number> &
    Record<"viewBox", string> &
    Record<"fullSvg", string>;
}

const Avatar = () => {
  const components = localComponents.pieces;
  const [selectedComponents, setSelectedComponents] = useState({});
  const [currentTypes, setCurrentTypes] = useState({});

  const validateMatchComponents = (
    componentsToCheck: string[],
    newComponent: SVGComponent
  ) => {
    componentsToCheck.forEach((keyComponent) => {
      if (
        selectedComponents[keyComponent] &&
        !selectedComponents[keyComponent]?.compatibleTypes.includes(
          newComponent.type
        )
      ) {
        selectedComponents[keyComponent] = ["eyebrow", "eyes"].includes(
          keyComponent
        )
          ? getFirstCompatibleComponent(keyComponent, newComponent.type)
          : "";

        if (keyComponent === "hair") selectedComponents["backHair"] = "";
      }
    });
  };

  function splitSvg(svg: string) {
    const splitedSvg = svg.split(">").map((v) => v + ">");

    const regex = /fill="([^"]+)"/;
    const colorfulElements: Array<IColors> = [];

    splitedSvg.forEach((el: string, index: number) => {
      if (!el.includes("fill")) return;

      const match = el.match(regex);
      if (!match) return;

      colorfulElements.push({
        index: index,
        currentColor: match[1],
        originalColor: match[1],
      });
    });

    return { splitedSvg, colorfulElements };
  }

  function turnSvgIntoElements(component: SVGComponent): {
    elements: TypeElements;
    elementsColor: TypeElementsColor;
  } {
    const { splitedSvg, colorfulElements } = splitSvg(component.svg);

    const secondaryElements: string[] = [];
    const secondaryColorElements: IColors[] = [];
    if (component.subcomponent) {
      const { splitedSvg, colorfulElements } = splitSvg(
        component.subcomponent.svg
      );
      secondaryElements.push(...splitedSvg);
      secondaryColorElements.push(...colorfulElements);
    }

    return {
      elements: { primary: splitedSvg, secondary: secondaryElements },
      elementsColor: {
        primary: colorfulElements,
        secondary: secondaryColorElements,
      },
    };
  }

  function changeColor(
    elements: TypeElements,
    index: number,
    newColor: string,
    key: "primary" | "secondary"
  ) {
    const newElement = elements[key][index].replace(
      /fill="([^"]+)"/,
      `fill="${newColor}"`
    );

    elements[key][index] = newElement;

    return newElement;
  }

  function makesTheMagic(component: SVGComponent) {
    if (!component) return;
    const { elements, elementsColor } = turnSvgIntoElements(component);
    console.info("elements, elementsColor", elements, elementsColor);

    elementsColor.primary.forEach((elementColor: IColors) => {
      changeColor(elements, elementColor.index, "#000", "primary");
    });
    elementsColor.secondary.forEach((elementColor: IColors) => {
      changeColor(elements, elementColor.index, "#000", "secondary");
    });

    component.svg = elements.primary.join("");
    if (component.subcomponent)
      component.subcomponent.svg = elements.secondary.join("");

    return component;
  }

  const changeComposition = ({ key, id }: Record<"key" | "id", string>) => {
    const changedComponents = {};
    let newComponent = components[key].components.find(
      (el: SVGComponent) => el.id === id
    );

    console.info("before component", newComponent);
    // newComponent = makesTheMagic(newComponent);
    console.info("after component", newComponent);

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
        component.compatibleTypes && component.compatibleTypes.includes(type)
    );
    return result || "";
  };

  useEffect(() => {
    assembleSuggestedComposition();
  }, []);

  return (
    <div>
      <Assembled defaultComposition={selectedComponents} type={currentTypes} />
      <Options changeComposition={changeComposition} type={currentTypes} />
    </div>
  );
};

export default Avatar;
