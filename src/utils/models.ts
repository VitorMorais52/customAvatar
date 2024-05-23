type SVGElement = {
  t: string;
  props: Record<string, string>;
  isNotEditable?: boolean;
};

type SVGProperty = SVGElement[];

interface IComponent {
  id: string;
  type: string;
  isNotEditable?: boolean;
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

interface IColors {
  index: number;
  currentColor: string;
  originalColor: string;
}

type ChangeComposition = (params: Record<"key" | "id", string>) => void;
type ChangeComponentsColor = (
  colorKey: string,
  indexColor: number,
  newColor: string
) => void;

interface CustomOptionsProps {
  changeComposition: ChangeComposition;
  changeComponentsColor: ChangeComponentsColor;
  type: Record<string, string>;
  colorByKeys: Record<string, string[]>;
  currentComponents: Record<string, IComponent>;
}

export { CustomOptionsProps, IColors, IComponent };
