import { useHistory } from 'react-router-dom';
import WrapLayout from 'container/layout/wrap/container';
import SplitLayout from 'container/layout/split/container';
import CollapsibleList from 'presentation-component/ui/collapsible-list';
import { CollapsibleTemplateCashbackFaq } from 'constants/application/faq';
import styles from './style.module.scss';
import { ROUTING_BALANCE } from 'routings/path';
import { PropsFromRedux } from './store';

interface BalanceFaqProps extends PropsFromRedux {}
/**
 * NOTE:
 *
 * - This component is used for webview only
 */
const BalanceFaq = ({ appStore: { mobileappWebviewStatus } }: BalanceFaqProps) => {
  const history = useHistory();

  if (!mobileappWebviewStatus) {
    history.replace(ROUTING_BALANCE);
  }

  return (
    <div className={styles.container}>
      <WrapLayout>
        <SplitLayout
          size="larger"
          subContainer={null}
          mainContainer={
            <div className={styles.mainBlockSection}>
              <CollapsibleList list={CollapsibleTemplateCashbackFaq} classes={{ container: styles.collapsibleList }} />
            </div>
          }
        />
      </WrapLayout>
    </div>
  );
};

export default BalanceFaq;
