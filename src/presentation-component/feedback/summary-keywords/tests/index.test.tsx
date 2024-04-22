import { reduxRender } from 'utils/test-utils';
import FeedbackSummaryKeywords from '..';

const keywords = [
  {
    keyword: 'cấp ẩm tốt',
    attitude: 'positive',
    slug: 'cap_am_tot'
  },
  {
    keyword: 'mùi dễ chịu',
    attitude: 'positive',
    slug: 'mui_de_chiu'
  },
  {
    keyword: 'thấm nhanh',
    attitude: 'positive',
    slug: 'tham_nhanh'
  },
  {
    keyword: 'mụn tốt',
    attitude: 'positive',
    slug: 'mun_tot'
  },
  {
    keyword: 'gel mỏng nhẹ',
    attitude: 'positive',
    slug: 'gel_mong_nhe'
  },
  {
    keyword: 'mỏng nhẹ',
    attitude: 'positive',
    slug: 'mong_nhe'
  },
  {
    keyword: 'trắng da',
    attitude: 'positive',
    slug: 'trang_da'
  },
  {
    keyword: 'dịu nhẹ',
    attitude: 'positive',
    slug: 'diu_nhe'
  },
  {
    keyword: 'sản phẩm tốt',
    attitude: 'positive',
    slug: 'san_pham_tot'
  },
  {
    keyword: 'ko bết dính',
    attitude: 'positive',
    slug: 'ko_bet_dinh'
  }
];

const component = (params = {}) => {
  const props = {
    keywords
  };

  return <FeedbackSummaryKeywords {...Object.assign({}, props, params)} />;
};

describe('FeedbackSummaryKeywords', () => {
  test(`renders`, () => {
    expect(() => {
      reduxRender(component(), { initialState: {} });
    }).not.toThrow();
  });
});
