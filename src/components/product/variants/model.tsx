export interface IProductColorProps {
  history?: any;
  boxSlug?: string;
  version?: string;
  optionTypes?: Array<any>;
  boxVariants?: Array<any>;
  onSelected?: (slug: string) => any;
}

export interface IProductColorState {
  idNumberProduct: number;
}
