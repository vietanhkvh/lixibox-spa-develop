import WrapLayout from '../../../layout/wrap';
import SplitLayout from '../../../layout/split';
import AsideBlock from '../../../layout/aside-block';
import MainBlock from '../../../layout/main-block';
import { isUndefined } from '../../../../utils/validate';
import SpecialDealsDetailContainer from '../../../../container/app-shop/special-deals/detail';
import { ROUTING_SPECIAL_DEALS } from '../../../../routings/path';
import ListNavigation from '../../../../components/navigation/list';

import { IProps } from './model';
import STYLE from './style';

const renderSubContainer = ({ specialDealList }) => {
  const specialDealsProps = {
    title: 'SPECIAL DEALS',
    style: STYLE.navigationBlock,
    content: <ListNavigation list={specialDealList} />
  };

  return <AsideBlock {...specialDealsProps} />;
};

const renderMainContainer = ({ title }) => {
  const mainBlockProps = {
    title: title,
    showHeader: true,
    showViewMore: false,
    content: <SpecialDealsDetailContainer />,
    style: STYLE.navigationBlock
  };

  return <MainBlock {...mainBlockProps} />;
};

const renderDesktop = (props: IProps) => {
  const {
    specialDealStore: { specialDealList },
    match: {
      params: { idSpecialDeal }
    }
  } = props as IProps;

  Array.isArray(specialDealList) &&
    specialDealList.map((item) => {
      item.icon = 'angle-right';
      item.link = `${ROUTING_SPECIAL_DEALS}/${item.slug}`;
      item.iconStyle = { width: 8 };
      return item;
    });

  const title =
    specialDealList.length > 0
      ? isUndefined(idSpecialDeal)
        ? specialDealList[0].description
        : specialDealList.filter((item) => item.slug === idSpecialDeal)[0].description
      : '';

  const splitLayoutProps = {
    subContainer: renderSubContainer({ specialDealList }),
    mainContainer: renderMainContainer({ title })
  };

  return (
    <div className={'special-deal-panel-container'}>
      <WrapLayout>
        <SplitLayout {...splitLayoutProps} />
      </WrapLayout>
    </div>
  );
};

export default renderDesktop;
