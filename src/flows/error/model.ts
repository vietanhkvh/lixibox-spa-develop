export interface Error {
  type: string;
  message: string;
}

export default interface State {
  index: Array<Error>;
}
