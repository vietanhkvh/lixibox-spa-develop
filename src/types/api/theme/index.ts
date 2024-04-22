import { MembershipLevelTypeType } from 'constants/api/generic';
import { Picture } from 'types/generic';

export interface Theme {
  color?: string;
  desktop_banner?: Picture;
  id?: number;
  membership_level_required?: MembershipLevelTypeType;
  mobile_banner?: Picture;
  name?: string;
  seo_description?: string;
  slug?: string;
  top_banner?: Picture;
}
