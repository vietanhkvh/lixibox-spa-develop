import { NavLink } from 'react-router-dom';

import Image from 'presentation-component/ui/image';
import SvgIcon from '../../ui/icon';
import { ROUTING_COMMUNITY_USER_FEED_PATH } from '../../../routings/path';
import { formatDateTime } from '../../../utils/date-time';
import { DATETIME_FORMAT_TYPE } from '../../../constants/application/global';

import styles from './style.module.scss';

const SAMPLE_PRODUCT_IMG =
  'https://upload.lixibox.com/system/pictures/files/000/053/299/medium/1602414743.jpg?t=1613721387';

const Message = ({ comment, onClick }) => {
  if (!comment)
    return (
      <div className={styles.emptyComment} onClick={() => onClick(1)}>
        <div className={styles.title}>Chưa có tin nhắn nào</div>
        <div className={styles.content}>Xem video và để lại lời nhắn với Lixibox bạn nhé</div>
      </div>
    );

  const userNavLinkProps = {
    to: `${ROUTING_COMMUNITY_USER_FEED_PATH}/${comment.userMobileReferralCode}`,
    target: '_blank'
  };

  return (
    <div className={styles.topMessage} onClick={() => onClick(1)}>
      <div className={styles.userInfo}>
        <NavLink {...userNavLinkProps}>
          <Image className={styles.avatar} src={comment.userAvatar} />
        </NavLink>
        <NavLink {...userNavLinkProps} className={styles.username}>
          {comment.username}
        </NavLink>
        <div className={styles.time} title={formatDateTime(comment.createdAt, DATETIME_FORMAT_TYPE.FULL_INFO)}>
          {formatDateTime(comment.createdAt, DATETIME_FORMAT_TYPE.DD_MM_YYYY)}
        </div>
      </div>
      <div className={styles.content}>{comment.content}</div>
      <AngleIcon />
    </div>
  );
};

const DiscountCode = ({ discountCode, onClick }) => {
  if (!discountCode) return null;

  return (
    <>
      <Line />
      <div className={styles.discountCode} onClick={() => onClick(2)}>
        <div className={styles.heading}>Mã giảm giá</div>
        <div className={styles.code}>{discountCode.code}</div>
        <AngleIcon />
      </div>
    </>
  );
};

const Product = ({ product, onClick }) => {
  if (!product) return null;

  return (
    <>
      <Line />
      <div className={styles.product} onClick={() => onClick(3)}>
        <div className={styles.heading}>Sản phẩm khuyến mãi</div>
        <div className={styles.info}>
          <Image src={SAMPLE_PRODUCT_IMG} />
          <div className={styles.productName}>{product.name}</div>
        </div>
        <AngleIcon />
      </div>
    </>
  );
};

const AngleIcon = () => {
  return <SvgIcon name={'angle-right'} className={styles.angleIcon} />;
};

const Line = () => <div className={styles.line} />;

interface IProps {
  topComment: any;
  topDiscountCode: any;
  topBox: any;
  onSelect?: (number) => void;
}

const LiveLighlightInfo = ({ topComment, topDiscountCode, topBox, onSelect }: IProps) => {
  return (
    <div className={styles.container}>
      <Message comment={topComment} onClick={onSelect} />
      <DiscountCode discountCode={topDiscountCode} onClick={onSelect} />
      <Product product={topBox} onClick={onSelect} />
    </div>
  );
};

export default LiveLighlightInfo;
