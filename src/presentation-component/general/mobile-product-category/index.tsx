import { useEffect, useState, FC } from 'react';
import styles from './style.module.scss';
import classNames from 'classnames';

import Loading from 'components/ui/lazy-loading';
import Image from 'presentation-component/ui/image/component';
import SubNodeMobileCategory from './sub-node-mobile-category';

import { generateTestId } from 'utils/test-utils';
import { BrowseNode } from './model';
import { CDN_ASSETS_PREFIX } from 'utils/uri';
import { mappingImageData } from './utils';

const MOCK_IMAGE = CDN_ASSETS_PREFIX('/category-square-cover/oral-care.webp');
interface MobileProductCategoryProps {
  data: Partial<BrowseNode[]>;
  handleCloseModal?: () => void;
  expandedMode?: boolean;
  isOpenedOnHeader?: boolean;
  selectedProduct?: BrowseNode;
  isUsedOnModal?: boolean;
  isMobileAppWebView?: boolean;
}

const MobileProductCategory: FC<MobileProductCategoryProps> = ({
  data,
  handleCloseModal,
  expandedMode,
  isOpenedOnHeader,
  selectedProduct,
  isUsedOnModal,
  isMobileAppWebView
}) => {
  const initialActiveTab = data?.[0]?.id;
  const originalSubnode = data?.find((node) => node.id === initialActiveTab)?.sub_nodes || [];

  const [activeNode, setActiveNode] = useState(initialActiveTab);
  const [subNodes, setSubNodes] = useState(originalSubnode);
  const [dropdownStates, setDropdownStates] = useState({});
  const [isUserInteracted, setIsUserInteracted] = useState(false);

  const toggleDropdown = (itemId: number) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId]
    }));
  };

  const findElementByIdWithPath = (data: Partial<BrowseNode[]>, id: number, path = []) => {
    if (!data) return null;
    for (const item of data) {
      if (item?.id === id) {
        return [...path, item.id];
      }
      if (item?.sub_nodes) {
        const foundPath = findElementByIdWithPath(item?.sub_nodes, id, [...path, item.id]);
        if (foundPath) {
          return foundPath;
        }
      }
    }
    return null;
  };

  const elementPath = findElementByIdWithPath(data, selectedProduct?.id);

  useEffect(() => {
    setActiveNode(data?.[0]?.id);
    setSubNodes(data?.find((node) => node.id === initialActiveTab)?.sub_nodes);
  }, [data]);

  useEffect(() => {
    if (isOpenedOnHeader) {
      const currentTabId = elementPath?.[0];
      setActiveNode(currentTabId);
      setSubNodes(data?.find((node) => node.id === currentTabId)?.sub_nodes || []);
    }
  }, [setActiveNode]);

  useEffect(() => {
    if (isOpenedOnHeader && !isUserInteracted) {
      const current2rdLayer = elementPath?.[1];
      scrollElementIntoView(current2rdLayer, 500);
    }
  }, [isOpenedOnHeader, elementPath, isUserInteracted]);

  const scrollElementIntoView = (id: number, delay: number) => {
    setTimeout(() => {
      const targetElement = document.getElementById(`subNode-${id}`);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, delay);
  };

  const renderNodeItem = (nodeData: BrowseNode) => (
    <div
      className={classNames(styles.node, activeNode === nodeData?.id && styles.activeNode)}
      onClick={() => {
        setActiveNode(nodeData?.id);
        setSubNodes(nodeData?.sub_nodes);
        setIsUserInteracted(true);
      }}
    >
      <Image
        {...generateTestId({ name: 'img-item-mobile-product-category' })}
        onMouseEnter={() => {}}
        onClick={() => {}}
        alt={nodeData?.name || nodeData?.vn_name}
        key={`product-mobile-product-category-left-${nodeData?.id}`}
        src={nodeData?.cover_image?.medium_url || nodeData?.cover_image?.large_url || MOCK_IMAGE}
        style={{}}
        className={styles.nodeImage}
      />
      <div className={classNames(styles.nodeText, activeNode === nodeData?.id && styles.activeNodeText)}>
        {nodeData?.name || nodeData?.vn_name}
      </div>
    </div>
  );

  const renderLeftZone = () =>
    mappingImageData(data)?.map((nodeItem) => <div key={nodeItem?.id}>{renderNodeItem(nodeItem)}</div>);

  if (!data) {
    return (
      <div className={styles.modalOverlay}>
        <Loading />
      </div>
    );
  }

  return (
    <div
      className={classNames(
        styles.mobileProductCategory,
        isUsedOnModal && styles.modal,
        isMobileAppWebView && styles.mobileAppView
      )}
    >
      <div className={classNames(styles.leftZone, isMobileAppWebView && styles.mobileAppViewSticky)}>
        <div className={styles.leftZoneContent}>{renderLeftZone()}</div>
      </div>

      <div className={styles.rightZone}>
        <SubNodeMobileCategory
          subNodes={subNodes}
          dropdownStates={dropdownStates}
          handleCloseModal={handleCloseModal}
          expandedMode={expandedMode}
          toggleDropdown={toggleDropdown}
        />
      </div>
    </div>
  );
};

MobileProductCategory.defaultProps = {
  expandedMode: false,
  isOpenedOnHeader: false,
  isUsedOnModal: false,
  isMobileAppWebView: false
};

export default MobileProductCategory;
