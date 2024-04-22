import { generateTestId } from 'utils/test-utils';
import STYLE from './style';

export const renderComponent = (props) => (
  <div style={{ display: 'block' }}>
    <span {...generateTestId({ name: 'title-item-product-detail' })} style={STYLE.container}>
      {props.name}
    </span>
  </div>
);
