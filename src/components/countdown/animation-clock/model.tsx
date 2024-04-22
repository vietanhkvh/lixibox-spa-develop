export interface IAnimationClock {
  data?: any;
  contentData?: {
    template: (...params) => React.ReactNode;
    propsTemplate: { [key: string]: any };
  };
  enable?: any;
  icon?: any;
  size?: any;
  fetchCountdownListAction?: any;
}
