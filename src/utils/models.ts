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

interface SvgProps {
  d?: string;
  fill?: string;
  stroke?: string;
  isNotEditable?: boolean;
  "stroke-linecap"?: string;
  "stroke-linejoin"?: string;
  "stroke-width"?: string;
}

interface SVGElement {
  t: string;
  props: SvgProps;
  isNotEditable?: boolean;
}

interface BaseComponent {
  id: string;
  svg: SVGElement[];
  viewBox: string;
  transform?: string;
  specificationsByType?: Record<string, string>;
  isNotEditable?: boolean;
  compatibleTypes?: string[];
  subcomponent?: {
    id?: string;
    svg: SVGElement[];
    fullSvg?: SVGElement[];
    viewBox?: string;
    transform?: string;
    specificationsByType?: Record<string, string>;
  };
  type?: string;
}

type IComponent = BaseComponent;

interface IAvatarComponents {
  components: IComponent[];
  validationRequiredBy?: string;
  hasRemoveOption?: boolean;
  validateMatchComponents?: string[];
}

interface ICustomOptionsProps {
  changeComposition: ChangeComposition;
  changeComponentsColor: ChangeComponentsColor;
  currentTypes: Record<string, string>;
  currentComponents: Record<string, IComponent>;
  avatarComponents: Record<string, IAvatarComponents>;
}

interface IBPColorPicker {
  color: number[];
  getUpdateColors: (color: number[]) => void;
}

interface IColorProps {
  currentComponent: IComponent;
  currentTab: string;
  changeComponentsColor: ChangeComponentsColor;
}

export {
  ICustomOptionsProps,
  IColors,
  IComponent,
  SVGElement,
  IBPColorPicker,
  IColorProps,
};
