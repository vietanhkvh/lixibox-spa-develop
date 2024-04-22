import classnames from 'classnames';

import Image from 'presentation-component/ui/image';
import { CDN_ASSETS_PREFIX } from '../../../utils/uri';

import styles from './style.module.scss';
import { isMobileVersion } from 'utils';

export interface IProps {
  style?: any;
  ratio?: '1:2' | '2:3' | '3:4' | '1:1' | '4:3' | '3:2' | '2:1';
  radius?: 'none' | 'small' | 'medium' | 'large';
  link?: null | string;
  src?: string | { mobile: ''; desktop: '' };
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'center-left'
    | 'center-center'
    | 'center-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
  display?: 'cover' | 'contain';
}

const RATIO_PADDING = {
  '1:2': '200%',
  '2:3': '150%',
  '3:4': '133%',
  '1:1': '100%',
  '1.2:1': '83%',
  '4:3': '75%',
  '3:2': '66%',
  '2:1': '50%',
  '3:1': '33.33%',
  '4:1': '25%'
};

const Img = ({ src, position, display, radius }) => {
  const imgProps = {
    className: classnames(
      styles.img,
      { [styles[`position-${position}`]]: !!position },
      { [styles[`display-${display}`]]: !!display },
      { [styles[`radius-${radius}`]]: !!radius }
    ),
    src: src || CDN_ASSETS_PREFIX('/general/photo-empty.png')
  };

  return <Image {...imgProps} />;
};

const TypeLink = ({ link, children, ...props }) => (
  <a {...props} href={link} target={'_blank'} rel="noreferrer">
    {children}
  </a>
);

const TypeElement = ({ children, ...props }) => <div {...props}>{children}</div>;
const defindSrc = (src, isMobileDevice) => {
  if (typeof src === 'string') {
    return src;
  } else {
    return isMobileDevice ? src.mobile : src.desktop;
  }
};
const LandingPageImage = ({
  style = {},
  ratio = '1:1',
  radius = 'none',
  link = '',
  src = '',
  position = 'center-center',
  display = 'contain'
}: IProps) => {
  const isMobileDevice = isMobileVersion();
  const srcReal = defindSrc(src, isMobileDevice);
  const containerProps = {
    className: styles.container,
    style: Object.assign(
      {},
      {
        paddingTop: RATIO_PADDING[ratio]
      },
      isMobileDevice ? style.mobile || style : style.desktop || style
    )
  };

  if (!!link && !!link.length)
    return (
      <TypeLink {...containerProps} link={link}>
        <Img {...{ src: srcReal, position, display, radius }} />
      </TypeLink>
    );

  return (
    <TypeElement {...containerProps}>
      <Img {...{ src: srcReal, position, display, radius }} />
    </TypeElement>
  );
};

export default LandingPageImage;
