import { useRef, useEffect } from 'react';
import classNames from 'classnames';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Image from 'presentation-component/ui/image';
import Loading from '../../../../../components/ui/loading';
import RatingStar from '../../../../../components/ui/rating-star';
import SubmitButton from '../../../../../components/ui/submit-button';
import MobileConfirmation from '../../../../../presentation-component/ui/mobile-confirmation';
import ThumbnailsWithUploader from '../../../../../presentation-component/feedback/thumbnails-with-uploader';
import { MAX_FEEDBACK_IMAGE_COUNT } from '../../../../../constants/application/feedback';
import { isMobileVersion } from '../../../../../utils/responsive';
import { validationMessage } from '../../../../../utils/validate';
import StepHeading from '../generic/step-heading';
import styles from './style.module.scss';

const FieldTitle = {
  rating: 'box',
  review: 'nhận xét'
};
const getFormSchema = () =>
  yup.object().shape({
    rating: yup
      .number()
      .required(({ path }) => validationMessage.rating(FieldTitle[path]))
      .min(1, ({ path }) => validationMessage.rating(FieldTitle[path]))
      .max(5, ({ path }) => validationMessage.rating(FieldTitle[path])),
    review: yup
      .string()
      .required(({ path }) => validationMessage.required(FieldTitle[path]))
      .minWords(8, ({ path, minWords }) => validationMessage.minWords(FieldTitle[path], minWords))
  });
const View = ({
  currentFeedback,
  productImage,
  productName,
  pictures,
  rating,
  review,
  isSubmitButtonLoading,
  deleteConfirmationState,
  onSubmit,
  onImageUpload,
  onImageRemove,
  onImageRemovalConfirmed,
  onImageRemovalRejected,
  onImageClick
}) => {
  const { register, errors, control, setValue, handleSubmit } = useForm({
    defaultValues: { rating, review },
    mode: 'onTouched',
    resolver: yupResolver(getFormSchema()),
    shouldUnregister: false
  });
  const ratingStarRef = useRef<HTMLDivElement>();
  useEffect(() => {
    setValue('rating', rating, { shouldValidate: true });
    setValue('review', review, { shouldValidate: true });
  }, [rating, review, setValue]);
  const anchor = useRef<HTMLDivElement>();

  return (
    <div
      className={classNames(
        styles.container,
        isMobileVersion() ? styles.containerMobile : styles.containerDesktop,
        styles.fullModeContaier
      )}
    >
      <div className={classNames(styles.editContainer, isMobileVersion() || styles.editContainerDesktop)}>
        {!currentFeedback ? (
          <Loading />
        ) : (
          <>
            <div className={styles.segmentContainer}>
              <Image alt={''} src={productImage} className={styles.productImage} />
              <div className={styles.productName}>{productName}</div>
              <Controller
                control={control}
                name={'rating'}
                onFocus={() => {
                  ratingStarRef.current &&
                    ratingStarRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
                }}
                render={({ onChange, value }) => (
                  <div ref={ratingStarRef}>
                    <RatingStar
                      {...{
                        value,
                        classes: { container: styles.ratingStar },
                        starStyle: { width: 30 },
                        starStyleInner: { width: 30 },
                        onChange,
                        view: true,
                        isLargerItem: true
                      }}
                    />
                  </div>
                )}
              />
              <div className={classNames(styles.errorMessage, styles.errorRating)}>
                {!!errors.rating && errors.rating.message}
              </div>
              <div className={styles.line} />
              <div ref={anchor} className={styles.textAreaTitle}>
                Đánh giá của bạn
              </div>
              <textarea
                {...{
                  name: 'review',
                  ref: register,
                  className: classNames(styles.textArea, !!errors.review && styles.textAreaError),
                  placeholder: 'Nhập ít nhất 8 từ'
                }}
              />
              <div className={classNames(styles.errorMessage, styles.errorReview)}>
                {!!errors.review && errors.review.message}
              </div>
            </div>

            <StepHeading
              {...{
                longTitle: `Hình ảnh (Chọn tối đa ${MAX_FEEDBACK_IMAGE_COUNT} hình)`,
                description: '',
                isAllowEdit: true
              }}
            />
            <ThumbnailsWithUploader
              pictures={pictures}
              isAllowEdit
              classes={{ container: classNames(styles.thumbnails, isMobileVersion() || styles.thumbnailsDesktop) }}
              onUpload={(data) => onImageUpload && onImageUpload(data)}
              onImageRemove={(data) => onImageRemove && onImageRemove(data)}
              onImageClick={onImageClick}
            />

            <div className={styles.feedbackNote}>
              * Lixibox không chấp nhận đánh giá có chứa mã giới thiệu bạn bè (Referral Code).
            </div>

            <div className={styles.submitButtonGroup}>
              <div
                className={classNames(
                  'bottom-fixed-element',
                  styles.fixed,
                  isMobileVersion() ? styles.fixedMobile : styles.fixedDesktop
                )}
              >
                <SubmitButton
                  {...{
                    color: 'black',
                    icon: 'star-line',
                    styleIcon: { color: 'white', width: 14, minWidth: 14, marginRight: 15, marginTop: -2 },
                    title: 'Sửa đánh giá',
                    className: styles.submitButton,
                    onSubmit: handleSubmit(onSubmit),
                    loading: isSubmitButtonLoading
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>
      <MobileConfirmation
        isOpen={deleteConfirmationState.isOpen}
        title={'Xóa ảnh'}
        prompt={'Bạn có muốn xóa ảnh này ra khỏi đánh giá?'}
        confirmationButton={{
          text: 'Đồng ý',
          color: 'black',
          loading: deleteConfirmationState.loading
        }}
        data={deleteConfirmationState.image}
        onCancel={onImageRemovalRejected}
        onConfirm={onImageRemovalConfirmed}
      />
    </div>
  );
};

export default View;
