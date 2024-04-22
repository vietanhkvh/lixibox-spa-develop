import classnames from 'classnames';

import { isMobileVersion } from '../../../utils/responsive';

import styles from './style.module.scss';
import Icon from 'presentation-component/ui/icon';

export interface IProps {
  text?: string;
  size?: 'large' | 'medium' | 'small';
  color?: string;
  fontSize?: 'large' | 'medium' | 'extra-large';
  fontWeight?: 'bold' | 'semi' | 'normal';
  textAlign?: 'left' | 'center' | 'right';
  justifyContent?: 'start' | 'center' | 'end' | 'around' | 'between';
  textTranform?: 'normal' | 'uppercase' | 'capitalize';
  isDisplayViewMore?: boolean;
  style?: {};
}
const DEVICE_SUFFIX = isMobileVersion() ? '' : '-desktop';

const ViewMore = (props) => {
  const { text = 'Xem tất cả', iconName = 'angle-right' } = props;
  const handleScrollToFeedback = () => {
    const elem = document.getElementById('product-detail-feedback');
    elem !== null && elem.scrollIntoView();
  };
  return (
    <div
      className={classnames(styles.viewMore, { [styles[`viewMore${DEVICE_SUFFIX}`]]: true })}
      onClick={handleScrollToFeedback}
    >
      {text} <Icon name={iconName} className={styles.iconContainer} />
    </div>
  );
};

const LandingPageHeading = ({
  text = 'Heading Text',
  size = 'medium',
  color = '#202020',
  fontSize = 'large',
  fontWeight = 'bold',
  textAlign = 'left',
  isDisplayViewMore = false,
  justifyContent = 'between',
  textTranform = 'normal',
  style
}: IProps) => {
  const containerProps = {
    className: classnames(
      styles.container,
      { [styles[`size-${size}`]]: !!size },
      { [styles[`container${DEVICE_SUFFIX}`]]: !!true },
      { [styles[`justify-${justifyContent}`]]: !!justifyContent }
    ),
    style: style
  };

  const textProps = {
    style: { color },
    className: classnames(
      styles.text,
      { [styles[`text${DEVICE_SUFFIX}`]]: true },
      { [styles[`tranform-${textTranform}`]]: !!textTranform },
      { [styles[`font-size-${fontSize}${DEVICE_SUFFIX}`]]: !!fontSize },
      { [styles[`font-weight-${fontWeight}`]]: !!fontWeight },
      { [styles[`align-${textAlign}`]]: !!textAlign }
    )
  };

  return (
    <div {...containerProps}>
      <div {...textProps}>{text}</div>
      {isDisplayViewMore && <ViewMore />}
    </div>
  );
};

export default LandingPageHeading;
