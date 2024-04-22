import { SHARED_MODAL_ID } from '../../constants/application/shared-modal';
import ConfirmationModal from '../../container/app-shop/shared-modals/confirmation';
import RefereeEntryModal from '../../container/app-shop/referee-entry-modal';
import RefereeSchemeDetailModal from '../../container/app-shop/referee-scheme-detail-modal';
import RefereeSchemesModal from '../../container/app-shop/referee-schemes-modal';

const modals = {
  [SHARED_MODAL_ID.ConfirmationModal]: ConfirmationModal,
  [SHARED_MODAL_ID.RefereeEntryModal]: RefereeEntryModal,
  [SHARED_MODAL_ID.RefereeSchemeDetailModal]: RefereeSchemeDetailModal,
  [SHARED_MODAL_ID.RefereeSchemesModal]: RefereeSchemesModal
};

export default modals;
