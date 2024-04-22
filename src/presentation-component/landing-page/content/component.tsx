import classnames from 'classnames';

import { renderHtmlContent } from '../../../utils/html';
import { isMobileVersion } from '../../../utils/responsive';

import styles from './style.module.scss';

export interface IProps {
  text?: string;
  size?: 'large' | 'medium' | 'small' | 'none';
  color?: string;
  fontSize?: 'medium' | 'small';
  fontWeight?: 'semi' | 'regular' | 'light';
  textAlign?: 'left' | 'center' | 'right';
}

const LandingPageContent = ({
  text = 'Detail Content Text Detail Content Text Detail Content Text Detail Content Text Detail Content Text Detail Content Text Detail Content Text',
  size = 'medium',
  color = '#757779',
  fontSize = 'medium',
  fontWeight = 'regular',
  textAlign = 'center'
}: IProps) => {
  const DEVICE_PREFIX = isMobileVersion() ? '' : 'desktop-';

  const containerProps = {
    className: classnames(styles.container, { [styles[`size-${size}`]]: !!size })
  };

  const textProps = {
    style: { color },
    className: classnames(
      styles.text,
      { [styles[`${DEVICE_PREFIX}font-size-${fontSize}`]]: !!fontSize },
      { [styles[`font-weight-${fontWeight}`]]: !!fontWeight },
      { [styles[`align-${textAlign}`]]: !!textAlign }
    )
  };

  return (
    <div {...containerProps}>
      <div {...textProps}>{renderHtmlContent({ content: text })}</div>
    </div>
  );
};

export default LandingPageContent;
