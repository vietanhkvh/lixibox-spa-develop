import classnames from 'classnames';
import { IProps, IState } from './model';
import renderLogo from './view-logo';
import renderSearchBox from './view-search';
import renderIconList from './view-icon-list';
import renderFeatures from './view-feature';

import style from './style.module.scss';
interface IRenderViewProps {
  props: IProps;
  state?: IState;
  handleUserInfoAction?: any;
  onCartIconClick: any;
}

const renderView = ({ props, onCartIconClick }: IRenderViewProps) => {
  const {
    authStore: { userInfo, signInStatus },
    cartStore: { cartList },
    themeHeader,
    history,
    availableSchemes,
    signOut,
    classname
  } = props;

  const containerProps = { className: classnames(classname, style.containerWrapper) };
  const renderUserInfoProps = {
    userInfo: userInfo,
    signInStatus,
    history
  };
  const featureProps = {
    themeHeader: themeHeader,
    accountInfor: renderUserInfoProps,
    availableSchemes: availableSchemes,
    signOut: signOut
  };
  return (
    <div {...containerProps}>
      {renderLogo()}
      {renderSearchBox()}
      {renderFeatures(featureProps)}
      {renderIconList({ list: cartList, onCartIconClick })}
    </div>
  );
};

export default renderView;
