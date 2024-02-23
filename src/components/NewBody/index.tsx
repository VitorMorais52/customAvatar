import React from "react";

import components from "./localComponents.json";

const NewBody = () => {
  const selectedComponents = {
    background: components.background[0].svg,
    sup: components.body[0].svg,
    shadowHead: components.head[0].shadowSvg,
    head: components.head[0].svg,
    hair: components.hair.rounded[0].svg,
    eyebrow: components.eyebrow[0].svg,
    eyes: components.eyes[0].svg,
    nose: components.nose[0].svg,
    mouth: components.mouth[0].svg,
    clothes: components.clothes.classic[0].svg,
  };

  const elPositioned = ({ el, x, y }) =>
    `<g transform="translate(${x}, ${y})">${el}</g>`;

  const mountedComposition = `${selectedComponents.background}${elPositioned({
    el: selectedComponents.sup,
    x: 118.5,
    y: 611.5,
  })}${elPositioned({
    el: selectedComponents.shadowHead,
    x: 350,
    y: 646,
  })}${elPositioned({
    el: selectedComponents.head,
    x: 221,
    y: 152,
  })}${elPositioned({
    el: selectedComponents.hair,
    x: 242,
    y: 104,
  })}${elPositioned({
    el: selectedComponents.eyebrow,
    x: 325,
    y: 340,
  })}${elPositioned({
    el: selectedComponents.eyes,
    x: 360,
    y: 421,
  })}${elPositioned({
    el: selectedComponents.nose,
    x: 463,
    y: 514,
  })}${elPositioned({
    el: selectedComponents.mouth,
    x: 416,
    y: 600,
  })}$${elPositioned({
    el: selectedComponents.clothes,
    x: 118.5,
    y: 768.5,
  })}`;

  return (
    <div>
      <svg
        width="1000"
        height="1000"
        viewBox="0 0 1000 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        dangerouslySetInnerHTML={{
          __html: mountedComposition,
        }}
      ></svg>
    </div>
  );
};

export default NewBody;
