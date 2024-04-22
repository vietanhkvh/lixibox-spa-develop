import { isMobileVersion } from '../../../utils/responsive';
import MobileView from './view/mobile';
import DesktopView from './view/desktop';

interface SearchHeaderProps {
  value: string;
  placeholder?: string;
  isAddressSelected?: boolean;
  onChange?: (value: string) => void;
  onLocationSelect?: () => void;
  onReset?: () => void;
  classes?: { container?: string };
}
export type ViewProps = SearchHeaderProps;

const SearchHeader = (props: SearchHeaderProps) => {
  const View = isMobileVersion() ? MobileView : DesktopView;
  return <View {...props} />;
};
SearchHeader.defaultProps = {
  placeholder: '',
  isAddressSelected: false
};

export default SearchHeader;
