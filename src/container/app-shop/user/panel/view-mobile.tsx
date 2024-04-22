import WrapLayout from '../../../layout/wrap';
import { AppShopUserSwitchRouting } from '../../../../routings/router';

interface ViewProps {
  location: any;
}
const View = (props: ViewProps) => (
  <WrapLayout className={'user-panel-container'}>
    <AppShopUserSwitchRouting />
  </WrapLayout>
);

export default View;
