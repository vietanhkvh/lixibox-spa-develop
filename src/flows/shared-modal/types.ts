export interface SharedModalDetail {
  isVisible: boolean;
  isStacked: boolean;
  surviveSingleRouteChange: boolean;
  data: { [key: string]: any };
}

export interface SharedModalById {
  [id: string]: SharedModalDetail;
}

export interface SharedModalState {
  byId: SharedModalById;
  stack: Array<string>;
}
