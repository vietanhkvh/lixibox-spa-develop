import { useEffect, useRef, useState } from 'react';

import NoContentPlaceholder, { NO_CONTENT_LOGO } from 'presentation-component/general/mobile/no-content-placeholder';
import SanitizedAndPreprocessedHTMLContent from 'presentation-component/general/sanitized-and-preprocessed-html-content';
import { isMobileVersion } from 'utils';
import { usePrevious } from 'utils/hook';
import { formatRemainingDuration } from 'utils/date-time';
import {
  MAINTENANCE_MODE_LONG_POLL_INTERAL_MS,
  MAINTENANCE_MODE_TIMEOUT_UPDATE_INTERAL_MS
} from 'constants/application/event';
import { CartState } from 'flows/cart/types';
import styles from './style.module.scss';

interface Page503Props {
  cartStore: CartState;
  maintenanceStore: any;
  clearMaintenanceMode: () => void;
  fetchConstantsAction: () => void;
}
const Page503 = ({
  cartStore: { isGetConstantSuccess },
  maintenanceStore: { maintenanceInfo },
  clearMaintenanceMode,
  fetchConstantsAction
}: Page503Props) => {
  const fetchIntervalId = useRef<NodeJS.Timeout>();
  const timeoutIntervalId = useRef<NodeJS.Timeout>();
  const wasGetConstantSuccess = usePrevious(isGetConstantSuccess);
  const [timeRemains, setTimeRemains] = useState('');

  useEffect(() => {
    clearInterval(timeoutIntervalId.current);

    const id = setInterval(() => {
      setTimeRemains(formatRemainingDuration(maintenanceInfo?.end_at || 0));
    }, MAINTENANCE_MODE_TIMEOUT_UPDATE_INTERAL_MS);
    fetchIntervalId.current = id;

    return () => {
      clearInterval(id);
    };
  }, [maintenanceInfo?.end_at]);
  useEffect(() => {
    const id = (fetchIntervalId.current = setInterval(() => {
      fetchConstantsAction();
    }, MAINTENANCE_MODE_LONG_POLL_INTERAL_MS));

    return () => {
      clearInterval(id);
    };
  }, []);
  useEffect(() => {
    if (wasGetConstantSuccess === false && isGetConstantSuccess) {
      clearInterval(timeoutIntervalId.current);
      clearInterval(fetchIntervalId.current);
      clearMaintenanceMode();
      window.location.reload();
    }
  }, [wasGetConstantSuccess, isGetConstantSuccess]);

  return (
    <div className={styles.container}>
      {!!isMobileVersion() && <div className={styles.header}>Thông báo</div>}
      <div className={styles.clientArea}>
        <NoContentPlaceholder
          title={maintenanceInfo?.title || 'Hệ thống đang bảo trì'}
          subtitle={
            timeRemains ? (
              <SanitizedAndPreprocessedHTMLContent
                content={`<p>Thời gian bảo trì còn lại: <span style="font-weight: 600;">${timeRemains}</span></p>`}
                isSantitizeHtml={false}
                formatRNAsLineBreak
              />
            ) : (
              ''
            )
          }
          info={
            maintenanceInfo?.message ? (
              <SanitizedAndPreprocessedHTMLContent
                content={maintenanceInfo?.message || ''}
                isSantitizeHtml={false}
                formatRNAsLineBreak
              />
            ) : (
              'Vui lòng quay lại trong giây lát'
            )
          }
          logo={NO_CONTENT_LOGO.MAINTENANCE}
          className={styles.maintenancePlaceholder}
          action={{ text: 'Thử lại' }}
          onClick={() => fetchConstantsAction()}
        />
      </div>
    </div>
  );
};

export default Page503;
