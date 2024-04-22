import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

import Image from 'presentation-component/ui/image';
import SubmitButton from '../../../components/ui/submit-button';
import GeneralModal from '../../modal/general-modal';
import SvgIcon from '../../ui/icon';

import { formatCurrency } from '../../../utils/currency';
import { scrollElement } from '../../../utils/scroll';
import { ROUTING_PRODUCT_DETAIL_PATH } from '../../../routings/path';

import SectionHeading from '../section-heading';
import * as VARIABLE from '../../../style/variable';
import styles from './style.module.scss';

function ProductItem(item, index) {
  if (!item) return null;

  const navLinkProp = { to: `${ROUTING_PRODUCT_DETAIL_PATH}/${item.slug}` };

  return (
    <div className={styles.item}>
      <div className={styles.productItem}>
        <NavLink {...navLinkProp}>
          <Image className={styles.image} src={item.image} />
        </NavLink>
        <div className={styles.info}>
          <NavLink {...navLinkProp} className={styles.name}>
            {item.name}
          </NavLink>
          <div className={styles.price}>{formatCurrency(item.price)}</div>
        </div>
        {!!this.isShowActionButton && (
          <SvgIcon name={'cart'} onClick={() => this.onAddToCart(item)} className={styles.cartIcon} />
        )}
      </div>
    </div>
  );
}

const Navigation = ({ onClick }) => {
  return (
    <div className={styles.nav}>
      <SvgIcon name={'angle-up'} className={styles.navItem} onClick={() => onClick('up')} />
      <SvgIcon name={'angle-down'} className={styles.navItem} onClick={() => onClick('down')} />
    </div>
  );
};

const navigateList = (direction) => {
  const element = document.getElementById('live-product-list');
  if (!element) return;

  const { scrollHeight, scrollTop } = element;
  const itemHeight = scrollHeight / ((element.children && element.children.length) || 1);
  let newPosition = -1;

  switch (direction) {
    case 'up':
      newPosition = 0 === scrollTop ? scrollHeight - itemHeight : scrollTop - itemHeight;
      break;

    case 'down':
      newPosition = scrollHeight - itemHeight === scrollTop ? 0 : scrollTop + itemHeight;
      break;
  }

  scrollElement({
    x: 0,
    y: newPosition,
    element,
    isAnimation: true
  });
};

interface IProps {
  productList: Array<any>;
  isShowFullList?: boolean;
  onAddToCart?: Function;
}

const LiveProduct = ({ productList, isShowFullList = false, onAddToCart = () => {} }: IProps) => {
  const [isShowDesktopListAllModal, setDisplayDesktopListAllModal] = useState(false);
  const [indexedProduct, setIndexedProduct] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      const element = document.getElementById('live-discount-code-list');
      element && 0 === element.scrollTop && navigateList('up');
    }, 1000);
  }, []);

  const sectionHeadingProps = {
    title: 'Sản phẩm khuyến mãi',
    actionTitle: !isShowFullList ? 'Xem tất cả' : '',
    onClickActionTitle: () => setDisplayDesktopListAllModal(true)
  };

  const isShowNav = !!productList && productList.length > 1 && !isShowFullList;

  const modalProps = {
    isOpen: !!isShowDesktopListAllModal,
    title: 'Sản phẩm khuyến mãi',
    rightIcon: 'close',
    fullHeight: true,
    className: styles.desktopListAllModal,
    isShowHeading: true,
    onRightActionClick: () => setDisplayDesktopListAllModal(false),
    onRequestClose: () => setDisplayDesktopListAllModal(false)
  };

  let timerDebouneScroll;

  return (
    <div className={styles.container}>
      <SectionHeading {...sectionHeadingProps} />
      <div className={styles.panel}>
        <div
          className={classnames(styles.list, { [styles.isShowFullList]: !!isShowFullList })}
          id={'live-product-list'}
          onScroll={() => {
            !!timerDebouneScroll && clearTimeout(timerDebouneScroll);
            timerDebouneScroll = setTimeout(() => {
              const element = document.getElementById('live-product-list');
              if (!element) return;

              const { scrollTop } = element;
              const index = scrollTop / 60;
              const product = !!productList && productList[index];
              product && setIndexedProduct(product);
            }, 200);
          }}
        >
          {!!productList &&
            productList.map(ProductItem, {
              isShowActionButton: !!isShowFullList,
              onAddToCart
            })}
        </div>
        {!!isShowNav && <Navigation onClick={(direction) => navigateList(direction)} />}
      </div>
      {!isShowFullList && (
        <SubmitButton
          // disabled={0 === product.stock}
          onSubmit={() => onAddToCart(indexedProduct)}
          color={'red'}
          size={'small'}
          title={'Thêm vào giỏ'}
          icon={'cart'}
          styleIcon={{ color: VARIABLE.colorWhite }}
          style={{ marginTop: 8, marginBottom: 5, marginLeft: 15, width: 'calc(100% - 30px)' }}
        />
      )}

      <GeneralModal {...modalProps}>
        <div className={styles.panel}>
          <div className={classnames(styles.list, styles.isShowFullList, styles.isShowInModal)}>
            {!!productList &&
              productList.map(ProductItem, {
                isShowActionButton: true,
                onAddToCart: (product) => {
                  onAddToCart(product);
                  setDisplayDesktopListAllModal(false);
                }
              })}
          </div>
        </div>
      </GeneralModal>
    </div>
  );
};

export default LiveProduct;
