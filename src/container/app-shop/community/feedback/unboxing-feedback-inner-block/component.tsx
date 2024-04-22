import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTING_COMMUNITY_PATH } from 'routings/path';
import { usePrevious } from 'utils/hook';
import { gatewayTrackUnboxingComplete } from 'tracking/gateway';
import View from './view';

interface ViewProps {
  authStore: any;
  sharedLink: string;
  unboxingDescription: string;
  isLoading: boolean;
  handleSharingLinkChange: (event: any) => void;
  handleSubmitShareLink: () => void;
}
interface UnboxingFeedbackInnerBlockProps {
  authStore?: any;
  loveStore?: any;
  unboxingStore?: any;
  addLoveAction?: any;
  fetchUnboxingConfigAction?: any;
}
const UnboxingFeedbackInnerBlock = ({
  authStore,
  loveStore: { isAddLoveWaiting, isAddLoveSuccess },
  unboxingStore: { config: unboxingConfig },
  addLoveAction,
  fetchUnboxingConfigAction
}: UnboxingFeedbackInnerBlockProps) => {
  const history = useHistory();
  const [sharedLink, setSharedLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchUnboxingConfigAction();
  }, []);
  const wasAddLoveWaiting = usePrevious(isAddLoveWaiting);
  useEffect(() => {
    if (wasAddLoveWaiting && !isAddLoveWaiting) {
      if (isAddLoveSuccess) {
        gatewayTrackUnboxingComplete();
        history.push(ROUTING_COMMUNITY_PATH);
      }
      setIsLoading(false);
    }
  }, [isAddLoveWaiting, isAddLoveSuccess, wasAddLoveWaiting, history]);
  const handleSharingLinkChange = (event) => setSharedLink(event.target.value);
  const handleSubmitShareLink = () => {
    addLoveAction({ sharedUrl: sharedLink });
    setIsLoading(true);
  };
  const unboxingDescription = unboxingConfig?.detail?.description || '';

  return (
    <View
      {...{
        authStore,
        sharedLink,
        unboxingDescription,
        isLoading,
        handleSharingLinkChange,
        handleSubmitShareLink
      }}
    />
  );
};

export type { ViewProps };
export default UnboxingFeedbackInnerBlock;
