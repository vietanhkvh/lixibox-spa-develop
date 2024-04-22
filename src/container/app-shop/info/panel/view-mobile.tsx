import { AppShopInfoSwitchRouting } from '../../../../routings/router';

import WrapLayout from '../../../layout/wrap';
import { IProps } from './model';

const renderView = (props: IProps) => {
  return (
    <div className={'info-panel-container'}>
      <WrapLayout>
        <AppShopInfoSwitchRouting />
      </WrapLayout>
    </div>
  );
};

export default renderView;
