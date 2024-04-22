import ProductImage from '../../../../../../../components/product/image';
import { isSafeData } from '../../../../../../../utils/check-safe-data';
import { MODAL_BOX_DETAIL_PICTURE } from '../../../../../../../constants/application/modal';
import { Product } from '../../../../../../../types/api/shop';
import { CombinedProduct } from '../../../model';

interface ProductImageCompositeProps {
  combinedProduct: CombinedProduct;
  product: Product;
  openModalAction: (data: any) => void;
  isFixedToolbar?: boolean;
}
const ProductImageComposite = ({
  combinedProduct,
  product,
  openModalAction,
  isFixedToolbar
}: ProductImageCompositeProps) => {
  return (
    <ProductImage
      isPauseVideo={isFixedToolbar}
      box={combinedProduct.box}
      onSelect={({ selected }) => {
        openModalAction(
          MODAL_BOX_DETAIL_PICTURE({
            selected,
            list: combinedProduct.picture,
            boxFeedbackPicture: [],
            video: Array.isArray(combinedProduct.video) ? combinedProduct.video : []
          })
        );
      }}
      list={combinedProduct.picture}
      badges={isSafeData(product, ['box', 'badges']) && product.box.badges}
      boxFeedbackPicture={[]} // boxFeedbackPicture={boxFeedbackPictureList}
      video={!!combinedProduct.video && !!combinedProduct.video.length ? combinedProduct.video : []}
    />
  );
};

export default ProductImageComposite;
