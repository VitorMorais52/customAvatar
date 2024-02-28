import React from "react";

import components from "../localComponents.json";
interface SVGComponent {
  svg: string;
  id?: string;
  coordinates: Record<"x" | "y", number>;
  shadow?: Record<"svg", string> | Record<"x" | "y", number>;
}

interface NewBodyProps {
  defaultComposition: Record<string, SVGComponent>;
}

const NewBody = ({ defaultComposition }: NewBodyProps) => {
  const elPositioned = (el: SVGComponent) =>
    `<g transform="translate(${el.coordinates.x}, ${el.coordinates.y})">${el.svg}</g>`;

  const svgBuilder = () => {
    const concatenatedString = Object.values(defaultComposition).reduce(
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
