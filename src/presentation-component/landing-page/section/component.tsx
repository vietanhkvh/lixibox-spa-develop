import classnames from 'classnames';

import { isMobileVersion } from '../../../utils/responsive';
import { IProps as IHeadingProps } from '../heading/component';
import { IProps as IContentProps } from '../content/component';

import Heading from '../heading';
import Content from '../content';
import Image from '../image';
import Video from '../video';
import ImageCarousel from '../image-carousel';
import ImageGallery from '../image-gallery';
import ImageWithContent from '../image-with-content';
import VideoGallery from '../video-gallery';
import ImageCenterContent from '../image-center-content';
import Rating from '../rating';

import styles from './style.module.scss';
import Accordion from 'presentation-component/ui/accordion';

const SwitchComponent = ({ componentType, componentData, extraData }) => {
  const { rating } = extraData;

  switch (componentType) {
    case 'Image':
      return <Image {...componentData} />;
    case 'Video':
      return <Video {...componentData} />;
    case 'ImageCarousel':
      return <ImageCarousel {...componentData} />;
    case 'ImageGallery':
      return <ImageGallery {...componentData} />;
    case 'ImageWithContent':
      return <ImageWithContent {...componentData} />;
    case 'VideoGallery':
      return <VideoGallery {...componentData} />;
    case 'ImageCenterContent':
      return <ImageCenterContent {...componentData} />;
    case 'Rating':
      return <Rating {...componentData} rating={rating} />;
    case 'Accordion':
      return <Accordion {...componentData} />;
    default:
      return null;
  }
};

interface IProps {
  layout?: 'full' | 'fixed';
  contentLayout?: 'full' | 'fixed';
  size?: 'large' | 'medium' | 'small' | 'empty';
  background?: string;
  heading?: IHeadingProps | null;
  content?: IContentProps | null;
  componentType?: string;
  componentData?: any;
  extraData?: {
    rating: any;
  };
}

const LandingPageSection = ({
  layout = 'fixed',
  contentLayout = 'fixed',
  size = 'empty',
  background = '#FFFFFF',
  heading = null,
  content = null,
  componentType = '',
  componentData = {},
  extraData = {
    rating: []
  }
}: IProps) => {
  const contentLayoutProps = {
    className: classnames(
      styles.contentLayout,
      { [styles['layout-full']]: 'fixed' === layout || 'full' === contentLayout },
      { [styles['layout-fixed']]: 'fixed' === contentLayout }
    )
  };

  return (
    <div
      className={classnames({
        [styles[`${isMobileVersion() ? '' : 'desktop-'}container`]]: true,
        [styles[`size-${size}`]]: !!size,
        [styles[`layout-${layout}`]]: !!layout
      })}
      style={{
        background
      }}
    >
      {!!heading && <Heading {...heading} />}
      {!!content && <Content {...content} />}

      <div {...contentLayoutProps}>
        <SwitchComponent {...{ componentType, componentData, extraData }} />
      </div>
    </div>
  );
};

export default LandingPageSection;
