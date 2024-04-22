import TopHeaderMagazine from '../top-header-magazine';
import WrapLayout from '../../../container/layout/wrap';

import { IProps } from './model';

function renderView(props) {
  const { param, categoryList } = props as IProps;
  return (
    <div className={'navigation-desktop-magazine'}>
      <WrapLayout>
        <TopHeaderMagazine categoryList={categoryList} param={param} />
      </WrapLayout>
    </div>
  );
}

export default renderView;
