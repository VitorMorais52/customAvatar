type SpecificationsByType = {
  coordinates: Record<"x" | "y", number>;
  scale: number;
};

interface IColors {
  index: number;
  currentColor: string;
  originalColor: string;
}

type TypeElementsColor = Record<"primary" | "secondary", IColors[]>;
type TypeElements = Record<"primary" | "secondary", string[]>;

interface SVGComponent {
  svg: string;
  id: string;
  coordinates: Record<"x" | "y", number>;
  viewBox: "string";
  backHair?: Record<"svg", string> & Record<"x" | "y", number>;
  shadow?: Record<"svg", string> & Record<"x" | "y", number>;
  type?: string;
  subcomponent?: Record<"svg", string> &
    Record<"x" | "y", number> &
    Record<"viewBox", string> &
    Record<"fullSvg", string>;
  compatibleTypes?: Array<string>;
  specificationsByType: SpecificationsByType;
}

type ChangeComposition = (params: Record<"key" | "id", string>) => void;
type ChangeComponentsColor = (colorKey: string, newValue: string[]) => void;

interface CustomOptionsProps {
  changeComposition: ChangeComposition;
  changeComponentsColor: ChangeComponentsColor;
  type: Record<string, string>;
  colorByKeys: Record<string, string[]>;
  currentComponents: Record<string, SVGComponent>;
}

export {
  SpecificationsByType,
  SVGComponent,
  CustomOptionsProps,
  TypeElements,
  IColors,
  TypeElementsColor,
};
