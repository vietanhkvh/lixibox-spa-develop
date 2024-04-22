import { mergeStyle } from 'utils/responsive';

import STYLE from './style';

/**
 * @deprecated Migrate usage to scss and remove
 */
const generalBlock = ({ children, title, extraTitle, style = {}, id = '', isShowHeading = true }) => {
  return (
    <div style={mergeStyle(STYLE.container, style)} id={id}>
      {!!isShowHeading && (
        <div style={STYLE.heading}>
          <div style={STYLE.title}>{title}</div>
          {!!extraTitle && <div style={STYLE.extraTitle}>{extraTitle()}</div>}
        </div>
      )}

      <div style={STYLE.content}>{children}</div>
    </div>
  );
};

export default generalBlock;
