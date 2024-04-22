import { calculateTime } from './module';

export const INITIAL_STATE = (props) => {
  return calculateTime(props.data);
};
