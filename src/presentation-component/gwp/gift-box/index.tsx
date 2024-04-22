import { isMobileVersion } from 'utils';
import { GiftBox as GiftBoxType } from 'types/api/gwp';
import MobileView from './view/mobile';
import DesktopView from './view/desktop';

interface ViewProps {
  box: GiftBoxType;
  classes?: { container?: string };
  onBodyClick: ({ box }: { box: GiftBoxType }) => void;
  onDetailButtonClick: ({ box }: { box: GiftBoxType }) => void;
}
interface GiftBoxProps {
  box: GiftBoxType;
  classes?: { container?: string };
  onBodyClick: ({ box }: { box: GiftBoxType }) => void;
  onDetailButtonClick: ({ box }: { box: GiftBoxType }) => void;
}
const GiftBox = ({ box, classes, onBodyClick, onDetailButtonClick }: GiftBoxProps) => {
  const View = isMobileVersion() ? MobileView : DesktopView;

  return (
    <View
      {...{
        box,
        classes,
        onBodyClick,
        onDetailButtonClick
      }}
    />
  );
};

export type { ViewProps };
export default GiftBox;
