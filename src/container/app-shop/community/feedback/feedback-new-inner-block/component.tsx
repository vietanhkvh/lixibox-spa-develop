import { useState, useEffect } from 'react';
import { useParams, useHistory, generatePath } from 'react-router-dom';

import { stringToHash } from '../../../../../utils/encode';
import { usePrevious } from '../../../../../utils/hook';
import { MODAL_BOX_DETAIL_PICTURE } from '../../../../../constants/application/modal';
import { ROUTING_ORDER_FEEDBACK } from '../../../../../routings/path';
import View from './view';

interface IFeedbackNewInnerProps {
  shopStore: any;
  feedbackStore: any;
  cartStore?: any;
  getProductDetailAction: any;
  addFeedbackAction: any;
  openModalAction: any;
}
const FeedbackNewInnerBlock = ({
  shopStore: { productDetail },
  feedbackStore: { addedFeedbackId, isAddingFeedback, isAddFeedbackSuccess },
  getProductDetailAction,
  addFeedbackAction,
  openModalAction,
  cartStore: {
    constants: { box_feedback_lixicoin }
  }
}: IFeedbackNewInnerProps) => {
  const history = useHistory();
  const { productId: _productId } = useParams<{ productId: string }>();
  const productId = parseInt(_productId);

  const currentProductHash = stringToHash(String(productId));
  const currentProduct = productDetail[currentProductHash];

  const [pictures, setPictures] = useState([]);
  const [isSubmitButtonLoading, setIsSubmitButtonLoading] = useState(false);
  const wasAddingFeedback = usePrevious(isAddingFeedback);

  useEffect(() => {
    getProductDetailAction({ productId: String(productId) });
  }, []);

  useEffect(() => {
    if (wasAddingFeedback && !isAddingFeedback) {
      setIsSubmitButtonLoading(false);
      if (isAddFeedbackSuccess && addedFeedbackId) {
        history.push(
          generatePath(ROUTING_ORDER_FEEDBACK, {
            feedbackId: addedFeedbackId
          })
        );
      }
    }
  }, [isAddingFeedback, wasAddingFeedback, addedFeedbackId, isAddFeedbackSuccess, history]);

  let productImage = '';
  let productName = '';

  if (currentProduct && currentProduct.box) {
    productImage = currentProduct.box.primary_picture && currentProduct.box.primary_picture.medium_url;
    productName = currentProduct.box.name;
  }

  const onImageClick = ({ index, images }) => {
    openModalAction(
      MODAL_BOX_DETAIL_PICTURE({
        selected: parseInt('101' + index),
        list: images.map(({ url }) => ({ medium_url: url, large_url: url, original_url: url }))
      })
    );
  };

  const onSubmit = ({ rating, review }) => {
    addFeedbackAction({
      box: currentProduct,
      feedbackableId: productId,
      feedbackableType: 'Box',
      rate: rating,
      review,
      title: '',
      pictures: pictures.map(({ url }) => url)
    });
    setIsSubmitButtonLoading(true);
  };

  return (
    <View
      {...{
        currentProduct,
        productImage,
        productName,
        pictures,
        isSubmitButtonLoading,
        onSubmit,
        onImageUpload: ({ allImages }) => setPictures(allImages),
        onImageRemove: ({ remainingImages }) => setPictures(remainingImages),
        onImageClick,
        lixicoinPerFeedback: box_feedback_lixicoin
      }}
    />
  );
};

export default FeedbackNewInnerBlock;
