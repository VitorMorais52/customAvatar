import React from "react";
import { turnSvgIntoElements } from "../../../utils/functions";
import { IColors, SVGComponent, TypeElements } from "../../../utils/models";

const keysOrder = [
  "background",
  "backHair",
  "body",
  "shadowHead",
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

interface NewBodyProps {
  defaultComposition: Record<string, SVGComponent>;
  type: Record<string, string>;
  colorByKeys: Record<string, string>;
}

const Assembled = ({ defaultComposition, type, colorByKeys }: NewBodyProps) => {
  const orderedValues = keysOrder.map((key) => {
    if (colorByKeys[key]) makesTheMagic(key, defaultComposition[key]);

    return defaultComposition[key];
  });

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

  function makesTheMagic(key: string, component: SVGComponent) {
    if (!component) return;

    const { elements, elementsColor } = turnSvgIntoElements(component);

    elementsColor.primary.forEach((elementColor: IColors) => {
      changeColor(elements, elementColor.index, colorByKeys[key], "primary");
    });
    elementsColor.secondary.forEach((elementColor: IColors) => {
      changeColor(elements, elementColor.index, colorByKeys[key], "secondary");
    });

    component.svg = elements.primary.join("");
    if (component.backHair)
      component.backHair.svg = elements.secondary.join("");

    return component;
  }

  const getPositionedElement = (el: SVGComponent) => {
    if (!el) return;

    if (el.specificationsByType) {
      const { coordinates, scale } = el.specificationsByType[type["head"]];
      return `<g transform="translate(${coordinates.x}, ${coordinates.y}), scale(${scale})">${el.svg}</g>`;
    }

    return `<g transform="translate(${el.coordinates.x}, ${el.coordinates.y})">${el.svg}</g>`;
  };

  const svgBuilder = () => {
    const concatenatedString = orderedValues.reduce((acc, value) => {
      if (!value || !value?.svg) return acc;
      return acc + getPositionedElement(value);
    }, "");
    return concatenatedString;
  };

  return (
    <div>
      <svg
        width="400"
        height="400"
        viewBox="0 0 1000 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        dangerouslySetInnerHTML={{
          __html: svgBuilder(),
        }}
      ></svg>
    </div>
  );
};

export default Assembled;
