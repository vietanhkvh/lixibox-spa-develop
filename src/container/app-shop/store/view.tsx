import StoreMap from '../../../components/modal/store-map';
import Wrap from '../../../container/layout/wrap';

import STYLE from './style';

function View() {
  return (
    <Wrap>
      <div style={STYLE.panel}>
        <StoreMap style={STYLE.storeMap} />
      </div>
    </Wrap>
  );
}

export default View;
