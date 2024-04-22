import { generateCategoryHirarchy } from '../utils';

const categories: any = [
  {
    id: 429,
    cover_image: {
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/browse_nodes/cover_images/000/000/429/large/CATEGORY-SKINCAREa.png',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/browse_nodes/cover_images/000/000/429/original/CATEGORY-SKINCAREa.png'
    },
    depth: 1,
    icon: {
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/browse_nodes/icons/000/000/429/large/skincare.png',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/browse_nodes/icons/000/000/429/medium/skincare.png',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/browse_nodes/icons/000/000/429/original/skincare.png'
    },
    menu_column: 1,
    name: 'Skin Care',
    parent_id: 840,
    slug: 'skin-care',
    vn_name: 'Dưỡng da'
  },
  {
    id: 432,
    cover_image: {
      large_url: '/images/large/missing.png'
    },
    depth: 2,
    icon: {
      large_url: '/icons/large/missing.png',
      medium_url: '/icons/medium/missing.png'
    },
    menu_column: 0,
    name: 'Treat',
    parent_id: 429,
    slug: 'treat',
    vn_name: 'Trị liệu / Serum'
  },
  {
    id: 509,
    cover_image: {
      large_url: '/images/large/missing.png'
    },
    depth: 3,
    icon: {
      large_url: '/icons/large/missing.png',
      medium_url: '/icons/medium/missing.png'
    },
    menu_column: 0,
    name: 'Essence / Serum/ Ampoule',
    parent_id: 432,
    slug: 'face-serum',
    vn_name: 'Tinh chất'
  },
  {
    id: 1097,
    cover_image: {
      large_url: '/images/large/missing.png'
    },
    depth: 0,
    icon: {
      large_url: '/icons/large/missing.png',
      medium_url: '/icons/medium/missing.png'
    },
    menu_column: 0,
    name: 'Skincare Concerns',
    parent_id: null,
    slug: 'skincare-concerns',
    vn_name: 'Các vấn đề da'
  },
  {
    id: 1098,
    cover_image: {
      large_url: '/images/large/missing.png'
    },
    depth: 3,
    icon: {
      large_url: '/icons/large/missing.png',
      medium_url: '/icons/medium/missing.png'
    },
    menu_column: 0,
    name: 'Dry Skin',
    parent_id: 1097,
    slug: 'dry-skin',
    vn_name: 'Da Khô'
  },
  {
    id: 1099,
    cover_image: {
      large_url: '/images/large/missing.png'
    },
    depth: 3,
    icon: {
      large_url: '/icons/large/missing.png',
      medium_url: '/icons/medium/missing.png'
    },
    menu_column: 0,
    name: 'Oily Skin',
    parent_id: 1097,
    slug: 'oily-skin',
    vn_name: 'Da Dầu'
  },
  {
    id: 1100,
    cover_image: {
      large_url: '/images/large/missing.png'
    },
    depth: 3,
    icon: {
      large_url: '/icons/large/missing.png',
      medium_url: '/icons/medium/missing.png'
    },
    menu_column: 0,
    name: 'Acne &amp; Blemishes',
    parent_id: 1097,
    slug: 'acne-amp-blemishes',
    vn_name: 'Da Mụn'
  },
  {
    id: 1101,
    cover_image: {
      large_url: '/images/large/missing.png'
    },
    depth: 3,
    icon: {
      large_url: '/icons/large/missing.png',
      medium_url: '/icons/medium/missing.png'
    },
    menu_column: 0,
    name: 'Sensitive Skin',
    parent_id: 1097,
    slug: 'sensitive-skin',
    vn_name: 'Da Nhạy Cảm'
  },
  {
    id: 1102,
    cover_image: {
      large_url: '/images/large/missing.png'
    },
    depth: 1,
    icon: {
      large_url: '/icons/large/missing.png',
      medium_url: '/icons/medium/missing.png'
    },
    menu_column: 0,
    name: 'Normal &amp; Combination Skin',
    parent_id: 1097,
    slug: 'normal-amp-combination-skin',
    vn_name: 'Da Thường & Hỗn Hợp'
  },
  {
    id: 1104,
    cover_image: {
      large_url: '/images/large/missing.png'
    },
    depth: 3,
    icon: {
      large_url: '/icons/large/missing.png',
      medium_url: '/icons/medium/missing.png'
    },
    menu_column: 0,
    name: 'Dark Spots',
    parent_id: 1097,
    slug: 'dark-spots',
    vn_name: 'Đốm Nâu'
  },
  {
    id: 1106,
    cover_image: {
      large_url: '/images/large/missing.png'
    },
    depth: 0,
    icon: {
      large_url: '/icons/large/missing.png',
      medium_url: '/icons/medium/missing.png'
    },
    menu_column: 0,
    name: 'Mom & Baby',
    parent_id: null,
    slug: 'mom-and-baby',
    vn_name: 'Mẹ và Bé'
  },
  {
    id: 1107,
    cover_image: {
      large_url: '/images/large/missing.png'
    },
    depth: 1,
    icon: {
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/browse_nodes/icons/000/001/107/large/logo-mom.png',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/browse_nodes/icons/000/001/107/medium/logo-mom.png',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/browse_nodes/icons/000/001/107/original/logo-mom.png'
    },
    menu_column: 0,
    name: 'Mom',
    parent_id: 1106,
    slug: 'mom',
    vn_name: 'Mẹ'
  },
  {
    id: 1112,
    cover_image: {
      large_url: '/images/large/missing.png'
    },
    depth: 2,
    icon: {
      large_url: '/icons/large/missing.png',
      medium_url: '/icons/medium/missing.png'
    },
    menu_column: 0,
    name: 'Mỹ phẩm',
    parent_id: 1107,
    slug: 'my-pham',
    vn_name: 'Skincare &amp; Makeup'
  }
];

const categoriesExpected = [
  {
    id: 1106,
    cover_image: {
      large_url: '/images/large/missing.png'
    },
    depth: 0,
    icon: {
      large_url: '/icons/large/missing.png',
      medium_url: '/icons/medium/missing.png'
    },
    menu_column: 0,
    name: 'Mom & Baby',
    parent_id: null,
    slug: 'mom-and-baby',
    vn_name: 'Mẹ và Bé'
  },
  {
    id: 1107,
    cover_image: {
      large_url: '/images/large/missing.png'
    },
    depth: 1,
    icon: {
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/browse_nodes/icons/000/001/107/large/logo-mom.png',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/browse_nodes/icons/000/001/107/medium/logo-mom.png',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/browse_nodes/icons/000/001/107/original/logo-mom.png'
    },
    menu_column: 0,
    name: 'Mom',
    parent_id: 1106,
    slug: 'mom',
    vn_name: 'Mẹ'
  },
  {
    id: 1112,
    cover_image: {
      large_url: '/images/large/missing.png'
    },
    depth: 2,
    icon: {
      large_url: '/icons/large/missing.png',
      medium_url: '/icons/medium/missing.png'
    },
    menu_column: 0,
    name: 'Mỹ phẩm',
    parent_id: 1107,
    slug: 'my-pham',
    vn_name: 'Skincare &amp; Makeup'
  }
];

const categoriesNoZeroDepth: any = [
  {
    id: 421,
    cover_image: {
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/browse_nodes/cover_images/000/000/421/large/CATEGORY-TOOLSa.png',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/browse_nodes/cover_images/000/000/421/original/CATEGORY-TOOLSa.png'
    },
    depth: 1,
    icon: {
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/browse_nodes/icons/000/000/421/large/brush.png',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/browse_nodes/icons/000/000/421/medium/brush.png',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/browse_nodes/icons/000/000/421/original/brush.png'
    },
    menu_column: 3,
    name: 'Tools &amp; Accessories',
    parent_id: 840,
    slug: 'tools-accessories',
    vn_name: 'Cọ & Phụ kiện'
  },
  {
    id: 422,
    cover_image: {
      large_url: '/images/large/missing.png'
    },
    depth: 1,
    icon: {
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/browse_nodes/icons/000/000/422/large/hair.png',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/browse_nodes/icons/000/000/422/medium/hair.png',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/browse_nodes/icons/000/000/422/original/hair.png'
    },
    menu_column: 1,
    name: 'Hair',
    parent_id: 840,
    slug: 'hair',
    vn_name: 'Tóc'
  },
  {
    id: 443,
    cover_image: {
      large_url: '/images/large/missing.png'
    },
    depth: 2,
    icon: {
      large_url: '/icons/large/missing.png',
      medium_url: '/icons/medium/missing.png'
    },
    menu_column: 0,
    name: 'Other',
    parent_id: 421,
    slug: 'other-tools',
    vn_name: 'Khác'
  }
];
const categoriesNoZeroDepthExpected = [
  {
    id: 421,
    cover_image: {
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/browse_nodes/cover_images/000/000/421/large/CATEGORY-TOOLSa.png',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/browse_nodes/cover_images/000/000/421/original/CATEGORY-TOOLSa.png'
    },
    depth: 1,
    icon: {
      large_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/browse_nodes/icons/000/000/421/large/brush.png',
      medium_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/browse_nodes/icons/000/000/421/medium/brush.png',
      original_url:
        'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/browse_nodes/icons/000/000/421/original/brush.png'
    },
    menu_column: 3,
    name: 'Tools &amp; Accessories',
    parent_id: 840,
    slug: 'tools-accessories',
    vn_name: 'Cọ & Phụ kiện'
  },
  {
    id: 443,
    cover_image: {
      large_url: '/images/large/missing.png'
    },
    depth: 2,
    icon: {
      large_url: '/icons/large/missing.png',
      medium_url: '/icons/medium/missing.png'
    },
    menu_column: 0,
    name: 'Other',
    parent_id: 421,
    slug: 'other-tools',
    vn_name: 'Khác'
  }
];

describe('generateCategoryHirarchy', () => {
  describe(`when 'categories' is empty`, () => {
    test(`an empty array is returned as the category hierarchy`, () => {
      expect(generateCategoryHirarchy([])).toEqual([]);
    });
  });
});

describe(`when 'categories' is non empty`, () => {
  test(`categories hierarchy is generated as expected`, () => {
    expect(generateCategoryHirarchy(categories)).toEqual(categoriesExpected);
    expect(generateCategoryHirarchy(categoriesNoZeroDepth)).toEqual(categoriesNoZeroDepthExpected);
  });
});
