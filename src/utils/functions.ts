import { IComponent } from "./models";

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

const getFirstCompatibleComponent = (components, key: string, type) => {
  const result = components[key].components.find(
    (component: IComponent) =>
      component.compatibleTypes && component.compatibleTypes.includes(type)
  );
  return result || "";
};

const validateMatchComponents = (
  components,
  selectedComponents,
  componentsToCheck: string[],
  newComponent: IComponent
) => {
  componentsToCheck.forEach((keyComponent) => {
    if (
      selectedComponents[keyComponent] &&
      !selectedComponents[keyComponent]?.compatibleTypes.includes(
        newComponent.type
      )
    ) {
      selectedComponents[keyComponent] = ["eyebrow", "eyes"].includes(
        keyComponent
      )
        ? getFirstCompatibleComponent(
            components,
            keyComponent,
            newComponent.type
          )
        : "";

      if (keyComponent === "hair") selectedComponents["backHair"] = "";
    }
  });
};

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

function transformSvgPropToStr(component: IComponent) {
  const { svg, subcomponent } = component;

  let fullsvgString = "";
  const svgString = svg
    .map((element) => {
      const { t, props } = element;
      const attributes = Object.entries(props)
        .map(([key, value]) => `${key}="${value}"`)
        .join(" ");
      return `<${t} ${attributes} />`;
    })
    .join(" ");

  if (subcomponent && subcomponent.fullSvg?.length) {
    fullsvgString = subcomponent.fullSvg
      .map((element) => {
        const { t, props } = element;
        const attributes = Object.entries(props)
          .map(([key, value]) => `${key}="${value}"`)
          .join(" ");
        return `<${t} ${attributes} />`;
      })
      .join(" ");

    return {
      ...component,
      svg: svgString,
      subcomponent: {
        ...component.subcomponent,
        fullSvg: fullsvgString,
      },
    };
  }

  return {
    ...component,
    svg: svgString,
  };
}

export {
  deepClone,
  reduceBrightness,
  darkenColor,
  validateMatchComponents,
  transformSvgPropToStr,
};
