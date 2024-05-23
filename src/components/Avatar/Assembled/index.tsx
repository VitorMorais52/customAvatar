import React from "react";
import { transformSVGObject } from "../../../utils/functions";

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
  defaultComposition: Record<string, IComponent>;
  type: Record<string, string>;
  colorByKeys: Record<string, string[]>;
}

type SVGElement = {
  isNotEditable: boolean;
  t: string;
  props: Record<string, string>;
};

type SVGProperty = SVGElement[];

interface IComponent {
  id: string;
  isNotEditable: boolean;
  compatibleTypes: string[];
  svg: SVGProperty;
  transform: string;
  viewBox: string;
  specificationsByType: {
    string: string;
  };
  subcomponent: {
    svg: SVGProperty;
    fullSvg: SVGProperty;
    viewBox: string;
    specificationsByType: {
      string: string;
    };
  };
}

const Assembled = ({ defaultComposition, type, colorByKeys }: NewBodyProps) => {
  const orderedValues = keysOrder.map((key) => {
    defaultComposition[key]?.svg?.forEach((element, index) => {
      if (colorByKeys[key][index] && element.props.fill)
        element.props.fill = colorByKeys[key][index];
    });
    return defaultComposition[key];
  });
  const setPropertiesInComponent = (el: IComponent) => {
    if (!el) return;

    const assembledComponent = transformSVGObject(el);

    const transformValue =
      assembledComponent.transform ||
      assembledComponent.specificationsByType[type["head"]] ||
      "";

    return `<g transform="${transformValue}">${assembledComponent.svg}</g>`;
  };

  const svgBuilder = () => {
    const concatenatedString = orderedValues.reduce((acc, value) => {
      if (!value || !value.svg) return acc;
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
