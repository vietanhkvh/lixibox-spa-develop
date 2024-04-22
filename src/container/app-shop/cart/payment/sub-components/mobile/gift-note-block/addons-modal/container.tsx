import { useState, useEffect } from 'react';
import classNames from 'classnames';

import GeneralModal from 'presentation-component/modal/general-modal';
import LoadingOverlay from 'presentation-component/ui/loading-overlay';
import StickyActionButton from 'components/ui/sticky-action-button';
import { isMobileVersion } from 'utils';
import { navigationTracking } from '../../../../tracking';
import AddonEntry, { ACTION_TYPE } from '../addon-entry';
import style from './style.module.scss';

export const MODAL_CLOSE_MODE = Object.freeze({
  DISCARD_CHANGED: 'DISCARD_CHANGES',
  ERRORED: 'ERRORED',
  REGUALR: 'REGULAR'
});

interface AddonsModalProps {
  isOpen: boolean;
  onRequestClose: ({ mode }: { mode: string }) => void;
  updateAccompanyServices: any;
  fetchAccompanyServices: any;
  setAccompaniesLocalAction: any;
  touchAccompaniesLocalAction: any;
  selectAccompaniesLocalOptionAction: any;
  updateAccompaniesLocalNoteAction: any;
  toggleSelectedAccompaniesLocalAction: any;
  cartStore: any;
}
const AddonsModal = ({
  isOpen,
  onRequestClose,
  cartStore: {
    accompanies: {
      available: availableAccompanies,
      local: localAccompanies,
      edited: localAccompaniesEdited,
      update: accompaniesUpdate
    },
    constants: { gift_message_words_limit }
  },

  fetchAccompanyServices,
  updateAccompanyServices,

  setAccompaniesLocalAction,
  touchAccompaniesLocalAction,
  selectAccompaniesLocalOptionAction,
  updateAccompaniesLocalNoteAction,
  toggleSelectedAccompaniesLocalAction
}: AddonsModalProps) => {
  const hasInvalidAddon = !!localAccompanies
    .filter((accompany) => accompany.selected)
    .find((accompany) => !accompany.isValid);

  const [loaderVisibility, setLoaderVisibility] = useState(false);
  useEffect(() => {
    if (isOpen) {
      fetchAccompanyServices();
    }
  }, [isOpen]);
  useEffect(() => {
    availableAccompanies.errored && onRequestClose({ mode: MODAL_CLOSE_MODE.ERRORED });
  }, [availableAccompanies.errored]);
  useEffect(() => {
    !availableAccompanies.fetching && setAccompaniesLocalAction();
    setLoaderVisibility(!!availableAccompanies.fetching);
  }, [availableAccompanies.fetching]);
  useEffect(() => {
    if (!accompaniesUpdate.updating) {
      setLoaderVisibility(false);
      onRequestClose({ mode: MODAL_CLOSE_MODE.REGUALR });
    }
  }, [accompaniesUpdate.updating]);

  return (
    <GeneralModal
      isOpen={isOpen}
      title={'Dịch vụ kèm theo'}
      leftTitle=""
      rightIcon={'close'}
      className={classNames(style.giftNoteModal, !isMobileVersion() && style.giftNoteModalDesktop)}
      classes={{ clientArea: style.content }}
      fullHeight
      testId={{ name: 'gift-note-addons-modal' }}
      onRightActionClick={() =>
        onRequestClose({
          mode: localAccompaniesEdited ? MODAL_CLOSE_MODE.DISCARD_CHANGED : MODAL_CLOSE_MODE.REGUALR
        })
      }
      onRequestClose={() =>
        onRequestClose({
          mode: localAccompaniesEdited ? MODAL_CLOSE_MODE.DISCARD_CHANGED : MODAL_CLOSE_MODE.REGUALR
        })
      }
    >
      <div className={style.body}>
        <div className={style.scrollableContent}>
          {availableAccompanies.index.map((service) => (
            <AddonEntry
              key={service.id}
              service={service}
              selection={localAccompanies.find((accompany) => accompany.serviceId === service.id)}
              messageWordLimit={gift_message_words_limit}
              onAction={({ type, selection }) => {
                switch (type) {
                  case ACTION_TYPE.SELECTED:
                    toggleSelectedAccompaniesLocalAction({ serviceId: selection.serviceId, action: 'add' });
                    break;
                  case ACTION_TYPE.UNSELECTED:
                    toggleSelectedAccompaniesLocalAction({ serviceId: selection.serviceId, action: 'remove' });
                    break;
                  case ACTION_TYPE.OPTION_SELECTED:
                    selectAccompaniesLocalOptionAction({
                      serviceId: selection.serviceId,
                      optionId: selection.optionId
                    });
                    break;
                  case ACTION_TYPE.NOTE_UPDATED:
                    updateAccompaniesLocalNoteAction({
                      serviceId: selection.serviceId,
                      note: selection.note,
                      isValid: selection.isValid
                    });
                    break;
                }
              }}
            />
          ))}
          <StickyActionButton
            action={{ text: 'Hoàn tất' }}
            buttonClass={style.primaryButton}
            disabled={hasInvalidAddon}
            onClick={() => {
              updateAccompanyServices({
                accompanies: localAccompanies
                  .filter((accompany) => accompany.selected)
                  .map((accompany) => ({
                    accompany_type: 'service',
                    accompany_id: accompany.serviceId,
                    external_type: 'option',
                    external_id: accompany.optionId,
                    note: accompany.note
                  }))
              });
              setLoaderVisibility(true);
              navigationTracking('button', 'Note');
            }}
          />
        </div>
      </div>
      {loaderVisibility && <LoadingOverlay className={style.loader} />}
    </GeneralModal>
  );
};

export default AddonsModal;
