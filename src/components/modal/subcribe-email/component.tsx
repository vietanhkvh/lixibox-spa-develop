import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { isMobileVersion } from 'utils';
import { getIsDisplayable, getIsWelcomeGiftPopupDisplayedToday } from './utils';
import DesktopView from './view/desktop';
import MobileView from './view/mobile';
import { PropsFromRedux } from './store';

export const VISIBILITY_DELAY_MS = 5000;

const SubcribeEmail: React.FC<PropsFromRedux> = ({ subcribeStore, sendSubcribeInfoAction }) => {
  const location = useLocation();
  const [isMinimal, setIsMinimal] = useState(true);

  const visibilityIntervalRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    visibilityIntervalRef.current = setTimeout(() => {
      if (isMobileVersion()) {
        /**
         * Auto maximize on mobile layout maximum once a day
         */
        const isWelcomeGiftPopupDisplayedToday = getIsWelcomeGiftPopupDisplayedToday();
        if (!isWelcomeGiftPopupDisplayedToday) {
          setIsMinimal(false);
        }
      } else {
        /**
         * Always auto maximize on desktop layout on load
         *
         * TODO: Check usability after 11.11 event
         */
        setIsMinimal(false);
      }
    }, VISIBILITY_DELAY_MS);

    return () => clearInterval(visibilityIntervalRef.current);
  }, []);

  const shouldDisplay = getIsDisplayable({ location });
  const View = isMobileVersion() ? MobileView : DesktopView;
  return !shouldDisplay ? null : (
    <View
      {...{
        isSuccess: subcribeStore.isSuccess,
        isMinimal,
        handleSubmit: ({ subscribe }) => sendSubcribeInfoAction({ contact: subscribe }),
        isSubmitLoading: subcribeStore.isLoading,
        handleToggleMinial: setIsMinimal
      }}
    />
  );
};

export default SubcribeEmail;
