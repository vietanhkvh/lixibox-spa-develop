import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom-v5-compat';
import Icon from 'components/ui/icon';
import { ROUTING_AUTH_SIGN_IN, ROUTING_AUTH_SIGN_UP } from 'routings/path';
import { setReferrer } from 'utils/navigate';
import { IProps } from './model';
import STYLE from './style';

const MobileSigninAlertContainer = ({ alertStore: { isShowMobileSignin }, closeMobileSigninAlertAction }: IProps) => {
  const navigate = useNavigate();

  const setReferrerAndClose = () => {
    setReferrer();
    closeMobileSigninAlertAction();
  };

  return (
    <div id={'alert-mobile-signin'} style={Object.assign({}, STYLE.container, isShowMobileSignin && STYLE.show)}>
      <div className={'alert-item'} style={STYLE.item} onClick={closeMobileSigninAlertAction}>
        <Icon
          {...{
            style: STYLE.icon,
            innerStyle: STYLE.iconInner,
            name: 'sign-in',
            onClick: () => {
              setReferrerAndClose();
              navigate(ROUTING_AUTH_SIGN_IN);
            }
          }}
        />
        <div style={STYLE.info}>
          <div style={STYLE.info.content}>
            Hãy{' '}
            <NavLink
              to={ROUTING_AUTH_SIGN_IN}
              onClick={(e) => {
                e.preventDefault();
                setReferrerAndClose();
                navigate(ROUTING_AUTH_SIGN_IN);
              }}
              style={STYLE.info.textBold}
            >
              Đăng nhập
            </NavLink>{' '}
            hoặc{' '}
            <NavLink
              to={ROUTING_AUTH_SIGN_UP}
              onClick={(e) => {
                e.preventDefault();
                setReferrerAndClose();
                navigate(ROUTING_AUTH_SIGN_UP);
              }}
              style={STYLE.info.textBold}
            >
              Tạo tài khoản
            </NavLink>{' '}
            tại Lixibox
          </div>
        </div>
        <Icon
          {...{
            innerStyle: STYLE.iconClose.inner,
            style: STYLE.iconClose,
            name: 'close',
            onClick: closeMobileSigninAlertAction
          }}
        />
      </div>
    </div>
  );
};

export default MobileSigninAlertContainer;
