import LoadingPlaceholder from '../../../../components/ui/loading-placeholder';

import * as STYLE from './style';

const placeholder = (item) => (
  <div style={STYLE.placeholder.container} key={item}>
    <LoadingPlaceholder style={STYLE.placeholder.heading} />
    <LoadingPlaceholder style={STYLE.placeholder.main} />
    <LoadingPlaceholder style={STYLE.placeholder.item} />
    <LoadingPlaceholder style={STYLE.placeholder.item} />
  </div>
);

export default placeholder;
