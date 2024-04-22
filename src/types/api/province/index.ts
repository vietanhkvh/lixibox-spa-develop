export interface District {
  full_name: string;
  id: number;
  name: string;
  province_id: number;
  unit: string;
}

export interface Province {
  districts: Array<District>;
  full_name: string;
  id: number;
  name: string;
  unit: string;
}
