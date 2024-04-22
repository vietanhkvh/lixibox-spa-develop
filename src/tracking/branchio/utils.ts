import { generatePath } from 'react-router-dom';
import { BoxCategory, ProductBox } from 'types/api/shop';
import { ContentType, Currency } from 'tracking/constants';
import { ROUTING_PRODUCT_DETAIL } from 'routings/path';
import { getTrackableBoxCategoryName } from 'tracking/utils';
import {
  BranchIOLoggerContentItemCustomAttribute,
  BranchIOLoggerContentItemStandardAttribute,
  BranchIOProductCategory,
  BranchIOProductCondition
} from './constant';

interface BranchIOGenerateEventAndCustomDataParams {
  // Branch.IO defined data attributes
  transaction_id?: string;
  currency?: string;
  revenue?: number;
  shipping?: number;
  tax?: number;
  coupon?: string;
  affiliation?: string;
  description?: string;
  purchase_loc?: string;
  store_pickup?: string;

  // Custom data attributes
  [key: string]: string | number;
}
interface BranchIOGenerateEventAndCustomDataReturn {
  [key: string]: string | number;
}
export const branchIoGenerateEventAndCustomData = (
  customData?: BranchIOGenerateEventAndCustomDataParams
): BranchIOGenerateEventAndCustomDataReturn => {
  const defaultEventAndCustomData = {
    currency: Currency.DEFAULT
  };

  return Object.assign({}, defaultEventAndCustomData, customData);
};

export interface BranchIOGetBoxDimensionsParams {
  box: ProductBox;
  categories?: Array<BoxCategory>;
}
export const branchIoGetBoxDimensions = ({ box, categories }: BranchIOGetBoxDimensionsParams) => {
  const categoryName = getTrackableBoxCategoryName({ box, categories });
  const name = box?.name || '';
  const productUrl = name
    ? `${process.env.REACT_APP_FQDN}${generatePath(ROUTING_PRODUCT_DETAIL, { idProduct: name })}`
    : '';

  return {
    [BranchIOLoggerContentItemStandardAttribute.CANONICAL_IDENTIFIER]: box?.lixibox_id || '',
    [BranchIOLoggerContentItemStandardAttribute.CANONICAL_URL]: productUrl,
    [BranchIOLoggerContentItemStandardAttribute.OG_TITLE]: name,
    [BranchIOLoggerContentItemStandardAttribute.SKU]: box?.lixibox_id || '',
    [BranchIOLoggerContentItemStandardAttribute.PRODUCT_NAME]: name,
    [BranchIOLoggerContentItemStandardAttribute.PRODUCT_CATEGORY]: BranchIOProductCategory.HEALTH_AND_BEAUTY,
    [BranchIOLoggerContentItemStandardAttribute.PRODUCT_BRAND]: box?.brand_name || '',
    [BranchIOLoggerContentItemStandardAttribute.CONDITION]: BranchIOProductCondition.NEW,
    [BranchIOLoggerContentItemStandardAttribute.PRICE]: box?.price || 0,
    [BranchIOLoggerContentItemStandardAttribute.CURRENCY]: Currency.DEFAULT,
    // Custom
    [BranchIOLoggerContentItemCustomAttribute.CATEGORY]: categoryName,
    // Web only
    [BranchIOLoggerContentItemCustomAttribute.CONTENT_TYPE]: ContentType.PRODUCT,
    [BranchIOLoggerContentItemCustomAttribute.CONTENT_ID]: box?.lixibox_id || ''
  };
};
