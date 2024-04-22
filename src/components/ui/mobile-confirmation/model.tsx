export interface IProps {
  children?: any;
  isOpen: boolean;
  closeTimeoutMS: number;
  classes: { container?: string; prompt?: string; button?: string };
  title: string;
  prompt: string;
  confirmationButton: { text: string; icon: string };
  label: string;
  data?: any;
  testId?: { name: string; id?: string };
  onCancel?: (param0?: any) => any;
  onConfirm?: (param0?: any) => any;
}
