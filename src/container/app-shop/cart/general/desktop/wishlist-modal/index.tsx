// TODO: Refactor. Ported for basic functionality, but not yet refactored
import renderView from './view';

/**
 * column: Number of products in each slide
 * template: Template component for each product
 * data: Array of props to feed to each product's template component
 */
interface IProps {
  data: Array<any>;
  template: any;
}
const WishlistModal = ({ data, template }: IProps) => {
  if (!data.length) return null;

  return renderView({ productList: data, template });
};
WishlistModal.defaultProps = { data: [], className: '' };

export default WishlistModal;
