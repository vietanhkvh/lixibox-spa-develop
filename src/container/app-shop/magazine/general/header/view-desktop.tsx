import DesktopNavigationMagazine from '../../../../../components/general/desktop-navigation-magazine';
import TopLink from '../../../../../components/general/top-link';

import STYLE from './style';

const renderDesktop = (props) => {
  const { param, categoryList } = props;

  return (
    <header style={STYLE.container}>
      <TopLink />
      <DesktopNavigationMagazine categoryList={categoryList} param={param} />
    </header>
  );
};

export default renderDesktop;
