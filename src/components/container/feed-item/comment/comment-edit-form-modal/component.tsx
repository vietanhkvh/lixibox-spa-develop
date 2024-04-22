import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import GeneralModal from '../../../../../presentation-component/modal/general-modal';
import StickyActionButton from '../../../../../components/ui/sticky-action-button';
import { validationMessage } from '../../../../../utils/validate';
import FormEntry from '../../../../../presentation-component/ui/form-entry';
import style from './style.module.scss';

const FieldTitle = {
  comment: 'Bình luận'
};
const getFormSchema = () =>
  yup.object().shape({
    comment: yup.string().required(({ path }) => validationMessage.required(FieldTitle[path]))
  });
interface CommentEditFormModalProps {
  initialValue: string;
  isOpen: boolean;
  onSubmit: (data: any) => any;
  onRequestClose: () => any;
}
const CommentEditFormModal = ({ isOpen, initialValue, onSubmit, onRequestClose }: CommentEditFormModalProps) => {
  const { register, errors, handleSubmit } = useForm({
    defaultValues: { comment: initialValue },
    resolver: yupResolver(getFormSchema()),
    shouldUnregister: false
  });

  return (
    <>
      <GeneralModal
        isOpen={isOpen}
        title="Sửa bình luận"
        leftTitle=""
        rightIcon={'close'}
        className={style.commentEditFormModal}
        onLeftActionClick={() => onRequestClose()}
        onRightActionClick={() => onRequestClose()}
        onRequestClose={() => onRequestClose()}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.body}>
            <FormEntry
              {...{
                name: 'comment',
                title: 'Bình luận',
                placeholder: 'Bình luận',
                error: errors.comment,
                select: true,
                required: false,
                autoFocus: true,
                ref: register,
                classes: { container: style.entry }
              }}
            />
          </div>
          <StickyActionButton
            action={{ text: 'Xong' }}
            buttonClass={style.primaryButton}
            onClick={handleSubmit(onSubmit)}
          />
        </form>
      </GeneralModal>
    </>
  );
};

export default CommentEditFormModal;
