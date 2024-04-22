import { IBox } from 'types/api/shop';

export interface IValue {
  color_code: null | string | number;
  color_image_url: null | string;
  image_url: null | string;
  name: string;
  option_value_id: number;
  option_value_name: string;
  presentation: string;
}
export interface IOptionType {
  name: string;
  presentation: string;
  values: Partial<IValue>[];
}

export interface IOptionValue {
  type: string;
  value_id: number;
}

export interface IBoxVariant {
  option_values?: Partial<IOptionValue>[];
  slug?: string;
}
export interface IProduct {
  box?: Partial<IBox>;
  box_variants?: IBoxVariant[];
  can_review?: boolean;
  liked?: boolean;
  option_types?: IOptionType[];
  reviewed?: boolean;
  success?: boolean;
}

export interface ISelectedVariant {
  color_code?: null | string | number;
  color_image_url?: null | string;
  image_url?: null | string;
  name?: string;
  option_value_id?: number;
  option_value_name?: string;
  presentation?: string;
  type?: string;
  value_id?: number;
}
