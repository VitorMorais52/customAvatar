import React from "react";

type SpecificationBy = {
  coordinates: Record<"x" | "y", number>;
  scale: number;
};

type Shadow = {
  svg: string;
  coordinates: Record<"x" | "y", number>;
};
interface SVGComponent {
  svg: string;
  id: string;
  viewBox: string;
  specificationsBy: SpecificationBy;
  coordinates: Record<"x" | "y", number>;
  shadow?: Shadow;
}
interface NewBodyProps {
  defaultComposition: Record<string, SVGComponent>;
  type: Record<string, string>;
}

const NewBody = ({ defaultComposition, type }: NewBodyProps) => {
  const elPositioned = (el: SVGComponent) => {
    if (el.specificationsBy) {
      const { coordinates, scale } = el.specificationsBy[type["head"]];
      return `<g transform="translate(${coordinates.x}, ${coordinates.y}), scale(${scale})">${el.svg}</g>`;
    }

    return `<g transform="translate(${el.coordinates.x}, ${el.coordinates.y})">${el.svg}</g>`;
  };

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
