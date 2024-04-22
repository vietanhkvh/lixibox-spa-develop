import { IProps } from './model';

export const DEFAULT_PROPS = {
  isOpen: false,
  title: 'Thông báo',
  prompt: '',
  classes: {},
  confirmationButton: {
    text: 'Confirm',
    icon: ''
  },
  closeTimeoutMS: 300,
  label: 'Confirmation Modal',
  data: {}
} as IProps;
