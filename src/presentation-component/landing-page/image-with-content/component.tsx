import classnames from 'classnames';

import { isMobileVersion } from '../../../utils/responsive';

import Image from '../image';
import { IProps as IImageProps } from '../image/component';
import Heading from '../heading';
import { IProps as IHeadingProps } from '../heading/component';
import Content from '../content';
import { IProps as IContentProps } from '../content/component';

import styles from './style.module.scss';

const DEVICE_PREFIX = isMobileVersion() ? '' : 'desktop-';

const TypeLink = ({ link, children, ...props }) => (
  <a {...props} href={link} target={'_blank'} rel="noreferrer">
    {children}
  </a>
);

const TypeElement = ({ children, ...props }) => <div {...props}>{children}</div>;

const TextWrap = ({ heading, content, textWrapAlign }) => {
  const containerProps = {
    className: classnames({}, styles.textWrap, { [styles[`textWrapAlign-${textWrapAlign}`]]: !!textWrapAlign })
  };

  return (
    <div {...containerProps}>
      {!!heading && <Heading {...heading} />}
      {!!content && <Content {...content} />}
    </div>
  );
};

const ImageWrap = ({ imageFlexRatio, image }) => (
  <div style={{ flex: imageFlexRatio }} className={styles.imageWrap}>
    <Image {...image} link={''} />
  </div>
);

interface IProps {
  size?: 'large' | 'medium' | 'small';
  isNoPadding?: boolean;
  imageFlexRatio?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  link?: string;
  imagePosition?: 'top' | 'bottom' | 'left' | 'right';
  textWrapAlign?: 'start' | 'center' | 'end';
  image?: IImageProps;
  heading?: IHeadingProps;
  content?: IContentProps;
}

const LandingPageImageWithContent = ({
  size = 'medium',
  isNoPadding = false,
  imageFlexRatio = 5,
  link = '',
  imagePosition = 'left',
  textWrapAlign = 'center',
  image = {
    ratio: '1:1',
    radius: 'none',
    link: '',
    src: '',
    position: 'center-center',
    display: 'contain',
    style: {}
  },
  heading = {
    text: 'Heading Text',
    size: 'medium',
    color: '#202020',
    fontSize: 'large',
    fontWeight: 'bold',
    textAlign: 'center' as const
  },
  content = {
    text: 'Detail Content Text Detail Content Text Detail Content Text Detail Content Text Detail Content Text Detail Content Text Detail Content Text',
    size: 'medium',
    color: '#757779',
    fontSize: 'medium',
    fontWeight: 'regular',
    textAlign: 'center' as const
  }
}: IProps) => {
  const containerProps = {
    className: classnames(
      styles.container,
      { [styles[`size-${size}`]]: !!size },
      { [styles[`imagePosition-${imagePosition}`]]: !!imagePosition },
      { [styles[`container-${DEVICE_PREFIX}`]]: !!true }
    ),
    style: !!isNoPadding ? { padding: 0 } : {}
  };

  if (!!link && !!link.length)
    return (
      <TypeLink {...containerProps} link={link}>
        <ImageWrap {...{ imageFlexRatio, image }} />
        <TextWrap {...{ heading, content, textWrapAlign }} />
      </TypeLink>
    );

  return (
    <TypeElement {...containerProps}>
      <ImageWrap {...{ imageFlexRatio, image }} />
      <TextWrap {...{ heading, content, textWrapAlign }} />
    </TypeElement>
  );
};

export default LandingPageImageWithContent;
