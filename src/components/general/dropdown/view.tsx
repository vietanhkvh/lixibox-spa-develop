import { mergeStyle } from '../../../utils/responsive';
import STYLE from './style';

function renderView() {
  const { visible, component, style = {}, dropdownBodyStyle = {}, section } = this.props;

  if (!visible) return null;

  return (
    <div className="filter-dropdown-container" style={mergeStyle(STYLE, style)}>
      <div className="dropdown-marker" style={mergeStyle(STYLE.dropdownMarker, STYLE.dropdownMarkerSection[section])} />
      <div className="dropdown-body" style={mergeStyle(STYLE.dropdownBody, dropdownBodyStyle)}>
        {component}
      </div>
    </div>
  );
}

export default renderView;
