import Icon from '../../ui/icon';

import STYLE from './style';

const renderView = ({ isShowButton, handleOnScroll }) => (
  <div>
    <Icon
      className={'go-to-top'}
      name={'arrow-up'}
      style={STYLE.icon(isShowButton)}
      innerStyle={STYLE.innerIcon}
      onClick={handleOnScroll}
    />
  </div>
);

export default renderView;
