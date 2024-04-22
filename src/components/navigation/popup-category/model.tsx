export interface IProps {
  /**
   * categories data
   */
  listMenu: any;
  /**
   * class style name
   */
  classes?: {
    container?: string;
  };
  /**
   * is showed state from parent component
   */
  showed?: boolean;
  /**
   * set showed state from parent component
   */
  setShowed?: (param: boolean) => void;
}

export interface IState {}
