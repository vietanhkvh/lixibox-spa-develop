import { AppShopInfoSwitchRouting } from '../../../../routings/router';

import WrapLayout from '../../../layout/wrap';
import SplitLayout from '../../../layout/split';
import AsideBlock from '../../../layout/aside-block';
import MainBlock from '../../../layout/main-block';

import { listAboutNavigation, listBuyNavigation, listStoreNavigation } from './initialize';
import ListNavigation from '../../../../components/navigation/list';

import { IProps } from './model';
import STYLE from './style';

const renderSubContainer = () => {
  const orderBlockProps = {
    title: 'THÔNG TIN',
    style: STYLE.navigationBlock,
    content: <ListNavigation list={listAboutNavigation} />
  };

  const buyBlockProps = {
    title: 'HƯỚNG DẪN MUA HÀNG',
    style: STYLE.navigationBlock,
    content: <ListNavigation list={listBuyNavigation} />
  };

  return (
    <div style={Object.assign({}, STYLE.container, STYLE.asidebar)}>
      <AsideBlock {...orderBlockProps} />
      <AsideBlock {...buyBlockProps} />
    </div>
  );
};

const renderMainContainer = ({ children, location }) => {
  const listNavigation = [...listAboutNavigation, ...listBuyNavigation, ...listStoreNavigation];

  const filteredList = listNavigation.filter((item) => item.link === location.pathname);
  if (0 === filteredList.length) {
    return null;
  }

  const routeName = filteredList[0].title;

  const mainBlockProps = {
    title: routeName,
    showHeader: true,
    showViewMore: false,
    content: <AppShopInfoSwitchRouting />,
    style: STYLE.container
  };

  return <MainBlock {...mainBlockProps} />;
};

const renderDesktop = (props: IProps) => {
  const { children, location } = props;
  const splitLayoutProps = {
    subContainer: renderSubContainer(),
    mainContainer: renderMainContainer({ children, location })
  };

  return (
    <div style={STYLE.desktopPanel}>
      <WrapLayout style={STYLE.desktopWrap}>
        <SplitLayout {...splitLayoutProps} />
      </WrapLayout>
    </div>
  );
};

export default renderDesktop;
