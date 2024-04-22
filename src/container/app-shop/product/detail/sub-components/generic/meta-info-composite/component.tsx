import MetaInfo from 'container/app/meta-info';
import { ORDER_TYPE } from 'constants/application/order';
import { ROUTING_PRODUCT_CATEGORY_PATH } from 'routings/path';
import { objectToHash } from 'utils';
import { Product } from 'types/api/shop';
import { ShopState } from 'flows/shop/types';
import { CombinedProduct } from '../../../model';

interface MetaInfoCompositeProps {
  productId: string;
  page: number;
  perPage: number;
  combinedProduct: CombinedProduct;
  product: Product;
  withProductReview?: boolean;
  shopStore: ShopState;
}
const MetaInfoComposite = ({
  productId,
  page,
  perPage,
  combinedProduct,
  product,
  withProductReview,
  shopStore: { boxesCategories, boxFeedback }
}: MetaInfoCompositeProps) => {
  const params = {
    productId: productId,
    page,
    perPage
  };
  const keyHash = objectToHash(params);
  const list = (boxFeedback && boxFeedback[keyHash]) || [];

  const combinedCategories =
    !!boxesCategories && Array.isArray(boxesCategories) && !!boxesCategories.length
      ? boxesCategories
      : [
          {
            depth: 1,
            name: 'Beauty Box',
            slug: 'beauty-box'
          }
        ];

  const categoriesFiltered = combinedCategories.filter((item) => item.depth === 1);

  const breadcrumbList =
    !!categoriesFiltered && !!categoriesFiltered.length
      ? [
          {
            position: 2,
            name: categoriesFiltered[0].name,
            item: `https://www.lixibox.com${ROUTING_PRODUCT_CATEGORY_PATH}/${categoriesFiltered[0].slug}`
          }
        ]
      : [];

  return (
    <MetaInfo
      url={window.location.href}
      info={{
        url: window.location.href,
        type: `product`,
        title: `${combinedProduct.name} | Lixibox`,
        description: product.box.short_description,
        image: product.box.primary_picture.large_url,
        keyword: 'mỹ phẩm, dưỡng da, trị mụn, skincare, makeup, halio, lustre'
      }}
      product={Object.assign(
        {
          id: combinedProduct.id,
          slug: combinedProduct.slug,
          brand:
            !!product.box.box_products &&
            !!product.box.box_products[0] &&
            !!product.box.box_products[0].product &&
            !!product.box.box_products[0].product.brand &&
            product.box.box_products.length === 1
              ? product.box.box_products[0].product.brand.slug
              : 'lixibox',
          stock: combinedProduct.stock || 0,
          condition: 'new',
          priceAmount: combinedProduct.currentPrice,
          priceCurrency: 'VND',
          retailerItemId: product.box && product.box.id,
          rating: product.box && product.box.rating,
          isPreOrder: product.box && product.box.pre_order_status === ORDER_TYPE.PENDING
        },
        withProductReview && { review: list.feedbacks || [] }
      )}
      structuredData={{ breadcrumbList }}
    />
  );
};
MetaInfoComposite.defaultProps = {
  withProductReview: false
};

export default MetaInfoComposite;
