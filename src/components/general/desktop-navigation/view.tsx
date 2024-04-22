import renderListNavigation from './view-list-navigation';
import { renderSubNavigation } from './view-sub-navigation';
import STYLE from './style';

function renderView() {
  const navigationDesktopProps = {
    style: Object.assign({}, STYLE, this.props.fixHeader && STYLE.fixHeader),
    onMouseLeave: this.hideMenuDesktop.bind(this)
  };

  return (
    <div className={'navigation-desktop'} {...navigationDesktopProps}>
      {renderListNavigation.bind(this)()}
      {renderSubNavigation.bind(this)()}
    </div>
  );
}

export default renderView;
