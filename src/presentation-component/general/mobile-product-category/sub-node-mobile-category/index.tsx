import classNames from 'classnames';
import styles from '../style.module.scss';
import { useHistory } from 'react-router-dom';

import SubNodeItem from '../sub-note-item';
import SvgIcon from '../../../ui/icon';

import { ROUTING_PRODUCT_CATEGORY_PATH } from 'routings/path';
import { mappingImageData, sortEmptyItemToTop } from '../utils';

const SubNodeMobileCategory = ({ subNodes, dropdownStates, handleCloseModal, expandedMode, toggleDropdown }) => {
  const history = useHistory();

  const dropdownProps = {
    name: 'angle-right',
    className: styles.dropdownIcon
  };

  if (!subNodes) return null;

  const sortedEmptyItemToTop = sortEmptyItemToTop(subNodes);

  return (
    <div className={classNames(styles.subNodes)}>
      {mappingImageData(sortedEmptyItemToTop)?.map((subNode) => (
        <div className={classNames(styles.subNodeWrapper)} id={`subNode-${subNode?.id}`} key={subNode?.id}>
          <div
            className={classNames(styles.subNode, dropdownStates[subNode?.id] && styles.removeBorderBottom)}
            key={subNode?.id}
          >
            <div
              className={styles.nodeName}
              onClick={() => {
                history.push(`${ROUTING_PRODUCT_CATEGORY_PATH}/${subNode?.slug}`);
                handleCloseModal();
              }}
            >
              {subNode?.name || subNode?.vn_name}
            </div>

            <div
              className={classNames(
                styles.subNodeIcon,
                dropdownStates[subNode?.id] && styles.rotateIcon,
                !expandedMode && subNode?.sub_nodes?.length === 0 && styles.hidden
              )}
              onClick={() => {
                if (expandedMode) {
                  history.push(`${ROUTING_PRODUCT_CATEGORY_PATH}/${subNode?.slug}`);
                  handleCloseModal();
                } else {
                  toggleDropdown(subNode?.id);
                }
              }}
            >
              <SvgIcon {...dropdownProps} />
            </div>
          </div>

          {subNode?.sub_nodes.length > 0 && (expandedMode || dropdownStates[subNode?.id]) && (
            <SubNodeItem subNodeProducts={subNode?.sub_nodes} handleCloseModal={handleCloseModal} />
          )}
        </div>
      ))}
    </div>
  );
};

export default SubNodeMobileCategory;
