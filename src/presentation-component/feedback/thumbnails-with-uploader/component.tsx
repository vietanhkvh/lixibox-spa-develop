import { RefObject, useRef } from 'react';
import classNames from 'classnames';

import { isSupportedImageExtension } from '../../../utils/feedback';
import { fileAsDataURLAsync } from '../../../utils/uri';
import { isMobileVersion } from '../../../utils/responsive';
import Image from 'presentation-component/ui/image';
import SvgIcon from '../../../presentation-component/ui/icon';
import { MAX_FEEDBACK_IMAGE_COUNT } from '../../../constants/application/feedback';
import styles from './style.module.scss';

interface Picture {
  id: number | null;
  url: string;
  [key: string]: any;
}
interface ThumbnailsWithUploaderProps {
  isAllowEdit: boolean;
  pictures: Array<Picture>;
  classes?: { container?: string };
  onImageRemove: (params: { removedImage: Picture; remainingImages: Array<Picture>; ref: RefObject<any> }) => any;
  onUpload: (params: { uploadedImages: Array<Picture>; allImages: Array<Picture> }) => any;
  onImageClick?: ({ index, image, images }: { index: number; image: Picture; images: Array<Picture> }) => any;
}
const ThumbnailsWithUploader = ({
  isAllowEdit,
  pictures,
  classes,
  onImageRemove,
  onUpload,
  onImageClick
}: ThumbnailsWithUploaderProps) => {
  let valueFileRef: any = useRef();

  const handleUploadImage = (e) => {
    e.preventDefault();
    const files = e.target.files;

    if (!files || !files.length) {
      return;
    }

    if (!isSupportedImageExtension(files)) {
      alert('Định đạng hình ảnh không thích hợp.');
      return;
    }

    const resolvableUrls = Object.keys(files)
      .map((key, $index) => {
        if ($index >= MAX_FEEDBACK_IMAGE_COUNT - pictures.length) {
          return false;
        }

        return fileAsDataURLAsync(files[key]);
      })
      .filter((resolvable) => resolvable) as Array<Promise<string | ArrayBuffer>>;

    Promise.all(resolvableUrls)
      .then((urls) => {
        const keys = pictures.reduce((previousObject, currentObject) => {
          return Object.assign(previousObject, {
            [currentObject.url]: currentObject
          });
        }, {});
        const uploadedImages: Array<Picture | null> = [];

        urls.forEach((url: string) => {
          if (!keys[url]) {
            uploadedImages.push({ id: null, url });
          }
        });

        const allImages = pictures.concat(uploadedImages);
        onUpload && onUpload({ uploadedImages, allImages });
      })
      .catch((e) => alert('Tải lên thất bại. Vui lòng thử với hình ảnh khác.'));

    if (valueFileRef && valueFileRef.current && valueFileRef.current) {
      valueFileRef.current.value = null;
    }
  };

  const handleRemoveImage = ({ index: removedIndex, image: removedImage, ref }) => {
    const remainingImages = pictures.filter((_, currentIndex) => currentIndex !== removedIndex);
    onImageRemove && onImageRemove({ removedImage, remainingImages, ref });
  };

  return (
    <div
      className={classNames(
        styles.thumbnailsWithUploader,
        isMobileVersion() || styles.thumbnailsWithUploaderDesktop,
        classes && classes.container
      )}
    >
      {pictures.map((item, index) => (
        <Thumbnail
          key={index}
          {...{
            index,
            item,
            isAllowEdit,
            handleRemoveImage,
            onImageClick: () => onImageClick && onImageClick({ index, image: item, images: pictures })
          }}
        />
      ))}
      {pictures.length < MAX_FEEDBACK_IMAGE_COUNT && !!isAllowEdit && (
        <ImageUploader uploadRef={valueFileRef} handleUploadImage={handleUploadImage} />
      )}
    </div>
  );
};

const Thumbnail = ({ item, index, isAllowEdit, handleRemoveImage, onImageClick }) => {
  const closeIconRef = useRef();

  return (
    <div
      className={classNames(
        styles.thumbnailBlock,
        isMobileVersion() && styles.thumbnailBlockMobile,
        styles.thumbnailContainer
      )}
      onClick={onImageClick}
    >
      <div className={styles.outerImage}>
        <Image alt="" src={item.url} className={styles.img} />
      </div>
      {!!isAllowEdit && (
        <SvgIcon
          ref={closeIconRef}
          name={'close'}
          className={styles.closeIcon}
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveImage({ index, image: item, ref: closeIconRef });
          }}
        />
      )}
    </div>
  );
};

const ImageUploader = ({ handleUploadImage, uploadRef }) => {
  const inputFileProps = {
    multiple: true,
    type: 'file',
    autoComplete: 'off',
    id: 'feedback-picture',
    className: styles.displayNone,
    onChange: handleUploadImage
  };

  return (
    <label
      className={classNames(
        styles.thumbnailBlock,
        isMobileVersion() && styles.thumbnailBlockMobile,
        styles.imageUploaderContainer,
        styles.imageUploadContainer
      )}
      htmlFor={'feedback-picture'}
    >
      <div className={styles.outerImage}>
        <SvgIcon name={'add'} className={styles.icon} />
      </div>
      <input ref={uploadRef} {...inputFileProps} />
    </label>
  );
};
ThumbnailsWithUploader.defaultProps = {
  pictures: [],
  onImageRemove: () => {},
  onUpload: () => {},
  onImageClick: () => {}
};

export default ThumbnailsWithUploader;
