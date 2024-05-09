import React from "react";
import { paintTheComponent } from "../../../utils/functions";
import { SVGComponent } from "../../../utils/models";

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
  colorByKeys: Record<string, string[]>;
}

const Assembled = ({ defaultComposition, type, colorByKeys }: NewBodyProps) => {
  const orderedValues = keysOrder.map((key) => {
    if (colorByKeys[key] && colorByKeys[key].length)
      paintTheComponent(key, defaultComposition[key], colorByKeys);

    return defaultComposition[key];
  });

  const setPropertiesInComponent = (el: SVGComponent) => {
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
      return acc + setPropertiesInComponent(value);
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
