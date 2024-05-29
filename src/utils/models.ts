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

type ChangeComposition = (
  params: Record<"componentKey" | "componentId", string>
) => void;

type ChangeComponentsColor = (
  key: string,
  index: number,
  color: string
) => void;

interface ICustomOptionsProps {
  changeComposition: ChangeComposition;
  changeComponentsColor: ChangeComponentsColor;
  currentTypes: Record<string, string>;
  currentComponents: Record<string, IComponent>;
}

export { ICustomOptionsProps, IColors, IComponent, SVGElement };
