import { useState, useEffect } from 'react';
import classnames from 'classnames';

import DiscountBlock from '../../../components/ui/discount-block';
import GeneralModal from '../../modal/general-modal';
import SectionHeading from '../section-heading';
import SvgIcon from '../../ui/icon';
import { scrollElement } from '../../../utils/scroll';

import * as VARIABLE from '../../../style/variable';
import styles from './style.module.scss';

function DiscountCodeItem(item, index) {
  return (
    <div className={styles.item}>
      <DiscountBlock
        border={['left', 'right']}
        backgroundColor={VARIABLE.colorPrimary}
        innerStyle={{ padding: '6px 8px' }}
      >
        <div className={styles.discountCodeItem}>
          <div className={styles.description}>{item.description}</div>
          <div className={styles.action}>
            <div className={styles.code}>{item.code}</div>
            <div className={styles.button} onClick={() => this.onClick(item.code)}>
              {'Áp dụng'}
            </div>
          </div>
        </div>
      </DiscountBlock>
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
  const element = document.getElementById('live-discount-code-list');
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
  discountCodeList: Array<any>;
  isShowFullList?: boolean;
  onAddDiscountCode?: Function;
}

const LiveDiscountCode = ({ discountCodeList, isShowFullList = false, onAddDiscountCode = () => {} }: IProps) => {
  const [isShowDesktopListAllModal, setDisplayDesktopListAllModal] = useState(false);

  useEffect(() => {
    !isShowFullList &&
      setTimeout(() => {
        const element = document.getElementById('live-discount-code-list');
        element && 0 === element.scrollTop && navigateList('up');
      }, 1000);
  }, []);

  const sectionHeadingProps = {
    title: 'Mã giảm giá',
    actionTitle: !isShowFullList ? 'Xem tất cả' : '',
    onClickActionTitle: () => setDisplayDesktopListAllModal(true)
  };

  const isShowNav = discountCodeList && discountCodeList.length > 1 && !isShowFullList;

  const modalProps = {
    isOpen: !!isShowDesktopListAllModal,
    title: 'Mã giảm giá',
    rightIcon: 'close',
    fullHeight: true,
    className: styles.desktopListAllModal,
    isShowHeading: true,
    onRightActionClick: () => setDisplayDesktopListAllModal(false),
    onRequestClose: () => setDisplayDesktopListAllModal(false)
  };

  return (
    <div className={styles.container}>
      <SectionHeading {...sectionHeadingProps} />
      <div className={styles.panel}>
        <div
          className={classnames(styles.list, { [styles.isShowFullList]: !!isShowFullList })}
          id={'live-discount-code-list'}
        >
          {!!discountCodeList && discountCodeList.map(DiscountCodeItem, { onClick: onAddDiscountCode })}
        </div>

        {!!isShowNav && <Navigation onClick={(direction) => navigateList(direction)} />}
      </div>
      <GeneralModal {...modalProps}>
        <div className={styles.panel}>
          <div
            className={classnames(styles.list, styles.isShowFullList, styles.isShowInModal)}
            id={'live-discount-code-list'}
          >
            {!!discountCodeList && discountCodeList.map(DiscountCodeItem, { onClick: onAddDiscountCode })}
          </div>
        </div>
      </GeneralModal>
    </div>
  );
};

export default LiveDiscountCode;
