export interface IProps {
  title?: string;
  size: string;
  color: string;
  icon?: string;
  svgIcon: string;
  svgIconClass: string;
  iconPosition?: string;
  align?: string;
  className?: string;
  testId?: { name: string; id?: string };
  loading?: boolean;
  disabled?: boolean;
  style?: any;
  styleIcon?: { [key: string]: any };
  onSubmit?: (arg?: any) => any;
  titleStyle?: any;
  titleClass?: string;
  type?: string;
  link?: string;
  linkTarget?: string;
  dataTestId?: string;
  dataTestErrorId?: string;
}
