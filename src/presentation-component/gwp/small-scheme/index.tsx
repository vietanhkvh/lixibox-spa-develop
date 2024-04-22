import { generatePath } from 'react-router-dom';
import { LinkedItem, Scheme } from 'types/api/gwp';
import { isMobileVersion } from 'utils';
import { ROUTING_GWP_DETAIL } from 'routings/path';
import MobileView from './view/mobile';
import DesktopView from './view/desktop';
import { getIsSchemeExpired } from 'utils/gwp';

interface ViewProps {
  descriptionText: string;
  linkedItems: Array<LinkedItem>;
  scheme: Scheme;
  isExpired: boolean;
  link: string;
  classes?: { container?: string };
  onClick?: (scheme: Scheme) => void;
}
interface SmallSchemeProps {
  scheme: Scheme;
  classes?: { container?: string };
}
const SmallScheme = ({ scheme, classes }: SmallSchemeProps) => {
  if (!scheme) return null;
  const descriptionText = scheme.benefit_message || scheme.discount_code?.description;
  const linkedItems = scheme.linked_items?.length ? scheme.linked_items.filter((item) => item?.name) : [];
  const isExpired = getIsSchemeExpired(scheme);
  const link = isExpired ? '#' : generatePath(ROUTING_GWP_DETAIL, { gwpSlug: scheme?.slug || '' });
  const View = isMobileVersion() ? MobileView : DesktopView;

  return (
    <View
      {...{
        scheme,
        isExpired,
        link,
        descriptionText,
        linkedItems,
        classes
      }}
    />
  );
};

export type { ViewProps };
export default SmallScheme;
