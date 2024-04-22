type ActionText = { text: string };
type ActionIcon = { icon: string };

export interface IProps {
  info?: { title: string; content: string };
  action: ActionText | ActionIcon | (ActionText & ActionIcon);
  nonsticky: boolean;
  disabled: boolean;
  loading: boolean;
  className?: string;
  buttonClass?: string;
  onClick?: (param0: any) => any;
  dataTestId?: string;
  dataTestErrorId?: string;
}
