type SpecificationsByType = {
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
  specificationsByType: SpecificationsByType;
  coordinates: Record<"x" | "y", number>;
  backHair?: Shadow;
  shadowHead?: Shadow;
}
interface NewBodyProps {
  defaultComposition: Record<string, SVGComponent>;
  type: Record<string, string>;
  colorByKeys: Record<string, string>;
}

interface IColors {
  index: number;
  currentColor: string;
  originalColor: string;
}

type TypeElementsColor = Record<"primary" | "secondary", IColors[]>;
type TypeElements = Record<"primary" | "secondary", string[]>;

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

export { splitSvg, turnSvgIntoElements, deepClone };
