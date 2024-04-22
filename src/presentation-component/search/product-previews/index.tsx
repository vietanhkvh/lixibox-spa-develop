import classNames from 'classnames';
import { ProductBox } from 'types/api/shop';
import SectionHeader from '../section-header';
import ProductPreview from '../product-preview';
import styles from './style.module.scss';

interface ProductPreviewsProps {
  products: ProductBox[];
  title?: {
    label: string;
    viewMoreLink?: {
      link: string;
      title: string;
      onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    };
  };
  /**
   * ID for tracing the origin of the click. Passed to the onProductClick and onAutoCompleteClick callbacks.
   */
  id?: string;
  onProductClick?: (params: {
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>;
    product: ProductBox;
    path: string;
    id?: string;
  }) => void;
  classes?: { container?: string; title?: string; rows?: string; item?: string };
}
const ProductPreviews: React.FC<ProductPreviewsProps> = ({ products, title, id, onProductClick, classes }) => {
  return (
    <div className={classNames(styles.productPreviews, classes?.container)}>
      {!!title && (
        <SectionHeader
          title={title?.label}
          classes={{ container: classNames(styles.header, classes?.title) }}
          viewMoreLink={title?.viewMoreLink}
        />
      )}
      <div className={classNames(styles.rows, classes?.rows)}>
        {products.map((product, index) => (
          <ProductPreview
            {...{
              key: index,
              box: product,
              classes: { container: classNames(styles.row, classes?.item) },
              onClick: (e, path) => onProductClick?.({ e, product, path, id })
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductPreviews;
