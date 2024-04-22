jest.mock('../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));
import { reduxRender } from '../../../../utils/test-utils';
import { GENDER_TYPE } from '../../../../constants/application/gender';
import SelectBox from '../component';

const genderList = [
  {
    id: GENDER_TYPE.FEMALE.id,
    title: GENDER_TYPE.FEMALE.title,
    selected: true
  },
  {
    id: GENDER_TYPE.MALE.id,
    title: GENDER_TYPE.MALE.title,
    selected: false
  }
];
const component = (params = {}) => {
  const props = {
    list: genderList,
    onChange: jest.fn(),
    title: 'Gender',
    search: 'Nữ',
    disable: false,
    testId: 'select-box'
  } as any;

  return <SelectBox {...Object.assign({}, props, params)} />;
};

describe('SelectBox', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
