import { closeModalAction } from '../../../../flows/modal/action';

export const mapStateToProps = (state) => ({});

export const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModalAction())
});
