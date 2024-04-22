import classNames from 'classnames';
import { useHistory } from 'react-router-dom';

import styles from '../style.module.scss';
import Image from 'presentation-component/ui/image/component';

import { ROUTING_PRODUCT_CATEGORY_PATH } from 'routings/path';
import { BrowseNode } from '../model';
import { mappingImageData } from '../utils';
import { generateTestId } from 'utils/test-utils';

interface ISubNodeItemProps {
  handleCloseModal?: () => void;
  subNodeProducts?: BrowseNode[];
}

const SubNodeItem = ({ subNodeProducts, handleCloseModal }: ISubNodeItemProps) => {
  const history = useHistory();
  if (!subNodeProducts) return null;

  return (
    <div className={classNames(styles.subNodeProductContainer)}>
      {mappingImageData(subNodeProducts)?.map((subNodeProduct: BrowseNode) => {
        return (
          <div className={classNames(styles.subNodeProductWrapper)} key={subNodeProduct?.id}>
            <div
              className={classNames(styles.subNodeProduct)}
              onClick={() => {
                history.push(`${ROUTING_PRODUCT_CATEGORY_PATH}/${subNodeProduct?.slug}`);
                handleCloseModal();
              }}
            >
              <Image
                {...generateTestId({ name: 'img-item-mobile-product-category' })}
                onMouseEnter={() => {}}
                onClick={() => {}}
                alt={subNodeProduct?.name || subNodeProduct?.vn_name}
                key={`product-mobile-product-category-${subNodeProduct?.id}`}
                src={subNodeProduct?.cover_image?.medium_url || subNodeProduct?.cover_image?.large_url}
                style={{}}
                className=""
              />
              <div className={classNames(styles.subNodeProductName)}>
                {subNodeProduct?.name || subNodeProduct?.vn_name}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SubNodeItem;
