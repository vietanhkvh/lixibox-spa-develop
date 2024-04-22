import { IProps, IState } from './model';
import FooterInformation from '../../../../components/general/footer-information';
import FooterNavigation from '../../../../components/general/footer-navigation';

import STYLE from './style';

const renderView = (props: IProps, state: IState) => {
  const { authStore, openModal, cartStore } = props;
  const { delayDisplay } = state;

  const { phone = '' } = cartStore.constants;

  return (
    <footer style={STYLE.container(true, delayDisplay)}>
      <FooterInformation
        referalCode={authStore.userInfo && authStore.userInfo.referral_code}
        openModal={openModal}
        phone={phone}
      />
      <FooterNavigation />
    </footer>
  );
};

export default renderView;
