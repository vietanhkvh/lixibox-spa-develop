import Image from 'presentation-component/ui/image';
import { isMobileDevice } from '../../../utils/responsive';
import STYLE from './style';

const renderHeading = ({ bannerImage, title, color }) => {
  if (!bannerImage && !title) return null;

  const imgProps = {
    alt: title,
    src: bannerImage,
    style: STYLE.heading.img
  };

  const titleProps = {
    id: 'theme-heading-title',
    style: STYLE.heading.title({ color })
  };

  return (
    <>
      {isMobileDevice() && !!title && !!title.length && <div {...titleProps}>{title}</div>}
      {!!bannerImage && (
        <div style={STYLE.heading.imgOuter}>
          <Image {...imgProps} />
        </div>
      )}
      {!isMobileDevice() && !!title && !!title.length && <div {...titleProps}>{title}</div>}
    </>
  );
};

export default renderHeading;
