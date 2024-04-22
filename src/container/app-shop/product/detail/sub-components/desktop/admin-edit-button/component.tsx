import { auth } from 'utils/auth';
import Icon from 'presentation-component/ui/icon';
import { AuthState } from 'flows/auth/types';
import { CombinedProduct } from '../../../model';
import styles from './style.module.scss';

interface AdminEditButtonProps {
  combinedProduct: CombinedProduct;
  authStore: AuthState;
}
const AdminEditButton = ({ combinedProduct, authStore: { userInfo } }: AdminEditButtonProps) => {
  const REDIRECT_ADMIN_PAGE_URL = `${process.env.REACT_APP_ADMIN_FQDN}/boxes/${combinedProduct.slug}`;

  return auth.loggedIn() && userInfo?.is_admin ? (
    <a href={REDIRECT_ADMIN_PAGE_URL} className={styles.container} rel="noreferrer" target={'_blank'}>
      <Icon name={'edit'} className={styles.icon} />
      EDIT
    </a>
  ) : null;
};

export default AdminEditButton;
