interface Image {
  large_url?: string;
  medium_url?: string;
}

export interface BrowseNode {
  activeMenu?: boolean;
  id?: number;
  cover_image?: Image;
  icon?: Image;
  menu_column?: number;
  name?: string;
  parent_id?: number | null;
  slug?: string;
  sub_nodes?: BrowseNode[];
  vn_name?: string;
}

export interface IconProps {
  name?: string;
  className?: string;
  onClick?: string;
}

export interface IMockProduct {
  slug: string;
  name: string;
  image: string;
}
