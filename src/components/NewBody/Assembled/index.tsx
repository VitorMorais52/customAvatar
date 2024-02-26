import React from "react";

import components from "../localComponents.json";
interface SVGComponent {
  svg: string;
  id?: string;
  coordinates: Record<"x" | "y", number>;
  shadow?: Record<"svg", string> | Record<"x" | "y", number>;
}

const NewBody = () => {
  const selectedComponents = {
    background: components.background[0],
    sup: components.body[0],
    shadowHead: components.head[0].shadow,
    head: components.head[0],
    hair: components.hair.rounded[0],
    eyebrow: components.eyebrow[0],
    eyes: components.eyes[0],
    nose: components.nose[0],
    mouth: components.mouth[0],
    clothes: components.clothes.classic[0],
  };

  const elPositioned = (el: SVGComponent) =>
    `<g transform="translate(${el.coordinates.x}, ${el.coordinates.y})">${el.svg}</g>`;

  const svgBuilder = () => {
    const concatenatedString = Object.values(selectedComponents).reduce(
      (acc, value) => {
        return acc + elPositioned(value);
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

export default NewBody;
