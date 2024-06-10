import React from "react";
import { transformSvgPropToStr } from "../../../utils/functions";
import { IComponent } from "../../../utils/models";

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
  avatarComposition: Record<string, IComponent>;
  currentTypes: Record<string, string>;
}

const Assembled = ({ avatarComposition, currentTypes }: NewBodyProps) => {
  const orderedAndPaintedComponents = keysOrder.map(
    (key) => avatarComposition[key]
  );

  const setPropertiesInComponent = (component: IComponent) => {
    if (!component) return;

    const { transform, specificationsByType, svg } =
      transformSvgPropToStr(component);

    const fromSpecByType = specificationsByType
      ? specificationsByType[currentTypes["head"]]
      : "";
    const transformValue = transform || fromSpecByType;

    return `<g transform="${transformValue}">${svg}</g>`;
  };

  const svgBuilder = () => {
    const concatenatedString = orderedAndPaintedComponents.reduce(
      (acc, value) => {
        if (!value || !value.svg) return acc;
        return acc + setPropertiesInComponent(value);
      },
      ""
    );
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
