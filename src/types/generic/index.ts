export type UnixSeconds = number;
export type IPv4 = string;

export interface Picture {
  facebook_url?: string;
  first_version?: boolean;
  height?: number;
  id?: number;
  large_url?: string;
  medium_url?: string;
  optimized_url?: string;
  original_url?: string;
  square_url?: string;
  processing?: boolean;
  thumb_url?: string;
  vertical_url?: string;
  url?: string;
  width?: number;
}

export interface TabParams {
  id: string;
  title: string;
  path: string;
}
