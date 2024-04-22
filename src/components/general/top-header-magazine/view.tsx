import renderLogo from './view-logo';
import renderNavigation from './view-navigation';

/**
 * Render top navigation
 * 1. Logo
 * 2. Menu
 */
const renderView = (props) => {
  return (
    <div className={'top-header-magazine'}>
      {renderLogo()}
      {renderNavigation(props)}
    </div>
  );
};

export default renderView;
