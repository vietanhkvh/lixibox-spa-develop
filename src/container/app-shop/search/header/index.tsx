import { isMobileVersion } from 'utils/responsive';
import DesktopView from './view/desktop';
import MobileView from './view/mobile';

interface SearchHeaderProps {
  keyword: string;
  placeholder: string;
  classes?: { container?: string };
  isOpen: boolean;
  onClick?: (keyword: string) => void;
  onChange: (keyword: string) => void;
  onSubmit: (source: string) => void;
  onReset: () => void;
  onRequestClose: () => void;
}
type ViewProps = SearchHeaderProps;
const SearchHeader = (props: SearchHeaderProps) => {
  const View = isMobileVersion() ? MobileView : DesktopView;
  return <View {...props} />;
};

export type { ViewProps };
export default SearchHeader;
