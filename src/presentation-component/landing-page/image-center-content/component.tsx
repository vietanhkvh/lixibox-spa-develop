import classnames from 'classnames';

import Image from 'presentation-component/ui/image';
import { renderHtmlContent } from '../../../utils/html';
import { isMobileVersion } from '../../../utils/responsive';

import styles from './style.module.scss';

const ContentItem = ({ title, content }: IContentItemProps, index: number) => {
  return (
    <div className={styles.contentGroupItem}>
      {title && <div className={styles.title}>{renderHtmlContent({ content: title })}</div>}
      {content && <div className={styles.content}>{renderHtmlContent({ content })}</div>}
    </div>
  );
};

const ContentGroup = ({ content, isRight }: { content: Array<IContentItemProps>; isRight?: boolean }) => {
  if (!content || !content.length) return <div className={styles.content}></div>;

  return (
    <div className={classnames(styles.contentGroup, { [styles.right]: !!isRight })}>{content.map(ContentItem)}</div>
  );
};

const ImageWrapper = ({ src, size }: IImageProps) => {
  const imageWrapProps = {
    className: styles.imageWrap,
    style: {
      minWidth: size,
      maxWidth: size
    }
  };

  return (
    <div {...imageWrapProps}>
      <Image src={src} />
    </div>
  );
};

interface IImageProps {
  src?: string;
  size: '25%' | '33%' | '50%';
}

interface IContentItemProps {
  title: string;
  content: string;
}

interface IProps {
  size?: 'large' | 'medium' | 'small';
  image: IImageProps;
  leftContent: Array<IContentItemProps>;
  rightContent: Array<IContentItemProps>;
}

const LandingPageImageCenterContent = ({
  size = 'medium',
  image = { src: '', size: '33%' },
  leftContent = [{ title: 'Left Title', content: 'Left Content' }],
  rightContent = [{ title: 'Left Title', content: 'Right Content' }]
}: IProps) => {
  const DEVICE_PREFIX = isMobileVersion() ? 'mobile' : 'desktop';

  return (
    <div className={classnames(styles.container, { [styles[`size-${DEVICE_PREFIX}`]]: !!size })}>
      <ContentGroup content={leftContent} />
      <ImageWrapper {...image} />
      <ContentGroup content={rightContent} isRight={true} />
    </div>
  );
};

export default LandingPageImageCenterContent;
