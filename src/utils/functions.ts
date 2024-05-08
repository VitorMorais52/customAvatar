import {
  IColors,
  SVGComponent,
  TypeElements,
  TypeElementsColor,
} from "./models";

function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  let clone: T;

  if (Array.isArray(obj)) {
    clone = [] as any;
  } else {
    clone = {} as any;
  }

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      (clone as any)[key] = deepClone(obj[key]);
    }
  }

  return clone;
}

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
  if (component.backHair) {
    const { splitedSvg, colorfulElements } = splitSvg(component.backHair.svg);
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

function reduceBrightness(color: string, decreaseValue: number) {
  let r = parseInt(color.substring(1, 3), 16);
  let g = parseInt(color.substring(3, 5), 16);
  let b = parseInt(color.substring(5, 7), 16);

  r = Math.floor(r * (1 - decreaseValue));
  g = Math.floor(g * (1 - decreaseValue));
  b = Math.floor(b * (1 - decreaseValue));

  return `#${(r < 16 ? "0" : "") + r.toString(16)}${
    (g < 16 ? "0" : "") + g.toString(16)
  }${(b < 16 ? "0" : "") + b.toString(16)}`;
}
function darkenColor(color: string, decreaseValue: number) {
  let r = parseInt(color.substring(1, 3), 16);
  let g = parseInt(color.substring(3, 5), 16);
  let b = parseInt(color.substring(5, 7), 16);

  // Escurece os componentes R, G e B
  r = Math.max(0, r - decreaseValue);
  g = Math.max(0, g - decreaseValue);
  b = Math.max(0, b - decreaseValue);

  // Converte de volta para uma cor hexadecimal
  return `#${(r < 16 ? "0" : "") + r.toString(16)}${
    (g < 16 ? "0" : "") + g.toString(16)
  }${(b < 16 ? "0" : "") + b.toString(16)}`;
}

export {
  splitSvg,
  turnSvgIntoElements,
  deepClone,
  reduceBrightness,
  darkenColor,
};
