import { reduxRender } from 'utils/test-utils';

jest.mock('../../../../../app/init-react-app', () => ({
  store: { getState: jest.fn() }
}));

import VariantsSelectorModal from '../index';

const box2 = {
  added_to_waitlist: false,
  avg_rate: 0,
  badges: { top_left: null, top_right: null, bottom_right: null, bottom_left: null },
  box_products: [
    {
      box_id: 10577,
      expert_description: 'Set',
      id: 14473,
      product: {
        brand: 'Lixi Baby',
        brand_image_url: 'hg',
        description: 'Lixi.',
        id: 796,
        capacity: '42.0 gr',
        country: 'Vietnam',
        display_name: 'Bộ 03 Cái Dụng Cụ Kẹp Ti Giả Chống Rơi Lixi Baby Set Pink Polka Dot',
        individual_box_slug: 'baby-pacifier-clip-dung-cu-kep-ti-gia-chong-roi-cho-em-be',
        ingredients: 'Polyester',
        made_in_country: 'China',
        name: 'Set 3 Cái Dụng Cụ Kẹp Ti Giả Chống Rơi Cho Em Bé Set Pink Polka Dot',
        original_price: 50000,
        price: 20000,
        primary_picture: {
          facebook_url: 'https://g?t=1677582981',
          large_url: 'http7582981',
          medium_url: 'htt2981',
          original_url: 'htt81',
          square_url: 'https:/981',
          thumb_url:
            'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-bucket/system/pictures/files/000/051/530/thumb/1595827215.jpg?t=1677582981',
          vertical_url: 'https:/2981'
        },
        primary_picture_webp: {
          facebook_url: 'https2981',
          large_url: 'htt81',
          medium_url: 'http2981',
          original_url: 'http981',
          square_url: 'htt81',
          thumb_url: 'htt82981',
          vertical_url: 'htt981'
        },
        saleable: true,
        slug: 'bo-03-cai-dung-cu-kep-ti-gia-chong-roi-lixi-baby-set-pink-polka-dot',
        usage: '1 đầu kẹp áo đeo theo người và 1 đầu giữ ti giả chống rơi cho em bé',
        usage_duration: null,
        wholesale_price: null
      },
      product_id: 10039,
      quantity: 1
    }
  ],
  length: 1,
  brand_name: 'Lixi Baby',
  categories: [{}, {}],
  coins_price: 0,
  delivery_time: {},
  for_redeem: false,
  id: 10577,
  is_bundle: false,
  is_individual: true,
  is_saleable: true,
  like_count: 1,
  lixibox_id: 'LXFB328307D8',
  lixicoin_bonus: 20,
  long_description: 'Set 3.\n',
  name: 'Bộ 03 Cái Dụng Cụ Kẹp Ti Giả Chống Rơi Lixi Baby Set Pink Polka Dot',
  note: null,
  number_of_products: 1,
  original_price: 50000,
  pictures: [{}],
  pictures_webp: [{}],
  pre_order_release_date: null,
  pre_order_status: null,
  preview_picture: {},
  preview_picture_webp: {},
  price: 20000,
  price_sale_off: 20000,
  primary_picture: {
    facebook_url: '',
    large_url: '',
    medium_url: '',
    original_url: '',
    square_url: ''
  },
  primary_picture_webp: {
    facebook_url: '',
    large_url: '',
    medium_url: '',
    original_url: '',
    square_url: ''
  },
  rating: { avg_rate: 0, count: 0 },
  reason_to_sell: null,
  saving_bundle_value: 0,
  short_description: 'Sebé.',
  size_guides: [],
  slug: 'baby-pacifier-clip-dung-cu-kep-ti-gia-chong-roi-cho-em-be',
  status: 'approved',
  stock: 10,
  store_stock: 0,
  tracking: { category_key: 'shop-gifts-gifts-for-baby' },
  videos: []
};

const selectedVariant = [
  {
    id: 7322763,
    box: {
      brand_name: 'IMAGE Skincare',
      lixibox_id: 'LX248D9225F9',
      name: 'Kem Chống Nắng Cho Da Dầu IMAGE Skincare Prevention Daily Matte Moisturizer Spf 30 91 Gram [HSD 1/2024]',
      original_price: 1490000,
      price: 1300000,
      primary_picture: {
        facebook_url: '',
        large_url: '',
        medium_url: '',
        original_url: '',
        square_url: '',
        thumb_url: '',
        vertical_url: ''
      },
      primary_picture_webp: {
        facebook_url: '',
        large_url: '',
        medium_url: '',
        original_url: '',
        square_url: ''
      },
      short_description: 'Kem Chống Nắng Cho Da Dầu IMAGE Skincare',
      slug: 'kem-chong-nang-cho-da-dau-image-skincare-prevention-daily-matte-moisturizer-spf-30-91-gram',
      status: 'approved',
      stock: 4,
      tracking: { category_key: 'beauty-skin-care-sunscreen' }
    },
    cart_id: 18083889,
    coins: 0,
    created_at: 1684839174,
    discount_message: null,
    discount_price: 0,
    editable: true,
    is_pre_order: false,
    linked_gift_type: null,
    note: 'Chỉ còn 4 trong kho - đặt hàng sớm',
    original_price: 1490000,
    pre_order_release_date: null,
    price: 1300000,
    purchase_type: 0,
    quantity: 1,
    referrer_id: null,
    removable: true,
    updated_at: 1684839174
  }
];

const product = {
  box: box2,
  box_variants: [
    {
      option_values: [
        {
          type: 'pattern',
          value_id: 345,
          slug: 'baby-pacifier-clip-dung-cu-kep-ti-gia-chong-roi-cho-em-be'
        }
      ]
    }
  ],
  can_review: false,
  liked: false,
  option_types: [
    {
      name: 'pattern',
      presentation: 'Họa tiết',
      values: [
        {
          color_code: null,
          color_image_url: null,
          image_url: '',
          name: 'Hình Dưa Hấu',
          option_value_id: 345,
          option_value_name: 'Hình Dưa Hấu',
          presentation: 'Hình Dưa Hấu'
        }
      ]
    }
  ]
};
const variantProps = {
  isLoading: false,
  onSubmit: jest.fn(),
  submitData: {},
  optionTypes: [],
  boxVariants: [],
  selectedVariant,
  onSelected: jest.fn(),
  purchaseType: 0,
  coins: 0,
  nextBox: box2,
  handleRemoveCartItem: jest.fn(),
  product,
  currentVariant: box2
};

const props = {
  variantProps,
  updatedVariantQuantity: 2,
  updateVariantQuantityAction: jest.fn()
};

describe('VariantsSelectorModal', () => {
  test('render without crashing', () => {
    expect(() => {
      reduxRender(<VariantsSelectorModal {...props} />, { initialState: {} });
    }).not.toThrow();
  });

  test('render the modal when data and cartItemProps are provided', () => {
    const { container } = reduxRender(<VariantsSelectorModal {...props} />, { initialState: {} });
    expect(container.getElementsByClassName('variants-selector-modal').length).toBe(1);
    expect(container.getElementsByClassName('modal').length).toBe(1);
    expect(container.getElementsByClassName('modalProductDetail').length).toBe(1);
    expect(container.getElementsByClassName('note').length).toBeGreaterThanOrEqual(1);
    expect(container.getElementsByClassName('submitZone').length).toBe(1);
  });

  test('renders the Loading Component when isLoading is true', () => {
    const { container } = reduxRender(
      <VariantsSelectorModal variantProps={{ ...variantProps, isLoading: true }} updatedVariantQuantity={2} />,
      { initialState: {} }
    );
    expect(container.getElementsByClassName('modalOverlay').length).toBe(1);
  });

  test('renders the CartItem component when cartItemProps.data.box is truthy', () => {
    const { container } = reduxRender(<VariantsSelectorModal {...props} />, { initialState: {} });
    expect(container.querySelector('#cart-item-testingId')).toBeInTheDocument();
  });

  test('disables the SubmitButton when updatedVariantQuantity is greater than stock', () => {
    const { container } = reduxRender(
      <VariantsSelectorModal variantProps={variantProps} updatedVariantQuantity={14} />,
      {
        initialState: {}
      }
    );
    expect(container.querySelector('.isDisabled')).toBeInTheDocument();
  });
});
