import { useEffect } from 'react';
import classNames from 'classnames';
import { Redirect } from 'react-router-dom';

import styles from './style.module.scss';
import MobileProductCategory from 'presentation-component/general/mobile-product-category';
import MobileAutoDisplayHeader from 'presentation-component/general/mobile-auto-display-header/component';
import MobileScreenHeader from 'presentation-component/general/mobile-screen-header/component';

import { isMobileVersion } from 'utils';
import * as ROUTINGS from '../../../../routings/path';

interface IMobileCategoryProps {
  menuStore?: any;
  fetchListMenuAction?: any;
  location?: any;
}

const MobileCategory = (props: IMobileCategoryProps) => {
  const { menuStore, fetchListMenuAction, location } = props;
  const browseNodes = menuStore?.listMenu?.browse_nodes || [];

  const isMobileAppWebView = location?.search?.includes('mobileapp-webview');

  useEffect(() => {
    if (!browseNodes || browseNodes.length === 0) {
      fetchListMenuAction();
    }
  }, []);

  if (!isMobileVersion()) {
    return <Redirect to={ROUTINGS.ROUTING_SHOP_INDEX} />;
  }

  const mobileScreenHeaderProps = {
    subTitle: '',
    title: 'Danh mục sản phẩm',
    isShowIcon: false,
    onClick: () => {}
  };

  return (
    <div>
      <MobileAutoDisplayHeader row={1} isDisableScroll isRemoveTop={isMobileAppWebView}>
        <MobileScreenHeader {...mobileScreenHeaderProps} />
      </MobileAutoDisplayHeader>

      <div className={classNames(styles.categoryContainer)}>
        <MobileProductCategory
          data={browseNodes}
          handleCloseModal={() => {}}
          expandedMode
          isMobileAppWebView={isMobileAppWebView}
        />
      </div>
    </div>
  );
};

export default MobileCategory;
