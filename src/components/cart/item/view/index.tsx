import renderCompact from './compact';
import renderExpanded from './expanded';

function renderView(props) {
  return props.compactView ? renderCompact.bind(this)() : renderExpanded.bind(this)();
}

export default renderView;
