// A. BASIC COMPONENT
// Là các component cơ bản dùng để tạo nên các composite component, bao gồm: heading, content, image, video

// Component heading dùng chung, có thể dùng cho 1 section lớn hoặc 1 sub component bất kỳ
export const heading = {
  type: 'heading',
  text: 'heading Text',
  props: {
    size: 'large || medium || small',
    color: 'hexa color code',
    fontSize: 'large || medium',
    fontWeight: 'bold || semi',
    textAlign: 'left || center || right'
  }
};

// Component content dùng chung
export const content = {
  type: 'content',
  text: 'Content text',
  props: {
    size: 'large || medium || small',
    color: 'hexa color code',
    fontSize: 'medium ||  small',
    fontWeight: 'semi || regular || light',
    textAlign: 'left || center || right'
  }
};

export const image = {
  type: 'image',
  props: {
    ratio: '1:2 || 2:3 || 3:4 || 1:1 || 4:3 || 3:2 || 2:1',
    radius: 'small || medium || large',
    // support link add vào, nếu ko có link thì ko click được
    // Lưu ý: Nếu imageWithContent component có link thì image sẽ chỉ render image thuần, ko có link
    link: '#',
    position:
      'top-left || top-center || top-right || middle-left || middle-center || middle-right || bottom-left || bottom-center || bottom-right',
    display: 'cover || contain'
  }
};

export const video = {
  type: 'video',
  props: {
    url: 'đường dẫn của video',
    type: 'youtube || original', // support chèn link youtube hoặc original link đã được up lên server nào đó,
    title: 'title cho video'
  }
};

// B. COMPOSITE COMPONENT
// Là các component được kết hợp từ các basic components

export const imageWithContent = {
  // image-with-content là dạng components chỉ có hình ảnh với content
  // component này có các kiểu sắp xếp giữa hình ảnh và content theo: trái - phải hoặc trên dưới
  type: 'image-with-content',

  props: {
    size: 'large || medium || small',
    // support link add vào, nếu ko có link thì ko click được
    // Lưu ý: Nếu imageWithContent component có link thì image sẽ chỉ render image thuần, ko có link
    link: '#',

    // Vị trí của mình so với content
    imageAlign: 'left || right || top || bottom',

    // image-with-content sẽ có 2 components chính là image và content
    // image và content là 2 thuộc tính bắt buộc: required
    // heading có thể có hoặc ko, heading nằm trên content
    image: image,
    heading: heading,
    content: content
  }
};

export const imageCarousel = {
  // image-carousel là dạng component slider chạy ngang với nhiều item
  // mỗi màn hình hiển thị 3 hoặc 5 slider
  // item là image hoặc imageWithContent
  // số lượng item tối thiểu là 3, tối đa là 10 (hoặc ko giới hạn)
  type: 'image-carousel',

  props: {
    autoSlide: true, // or false
    autoSlideTimer: 1, // seconds
    isDisplayNavigationButton: true, // or false
    list: [image, image, image, image, image]
    // list: [imageWithContent, imageWithContent, imageWithContent, imageWithContent, imageWithContent],
  }
};

export const imageGallery = {
  // image-gallery là dạng component hiển thị danh sách image hoặc imageWithContent theo dạng lưới
  // thành từng hàng và cột
  type: 'image-gallery',

  props: {
    type: 'image || imageWithContent',
    column: 3, // 3, 4 hoặc 5 cột, còn số dòng sẽ phụ thuộc và số lượng item trong đó,
    list: [image, image, image, image, image],
    // list: [imageWithContent, imageWithContent, imageWithContent, imageWithContent, imageWithContent],
    itemPadding: 'large' // | 'medium' | 'small';
  }
};

export const videoGallery = {
  // video-gallery là component hiển thị danh sách các video
  type: 'video-gallery',

  props: {
    // Số lượng tối thiểu từ 1
    list: [video, video, video]
  }
};

// C. SECTION
// Mỗi section là 1 block, 1 khối cơ bản
// section có thuộc tính riêng của section, có chứa heading, content và 1 composite components

export const section = {
  type: 'section',

  // Props là các thuộc tính bắt buộc phải có của 1 section hay 1 components bất kỳ
  props: {
    layout: 'full || fixed',
    size: 'large || medium || small',
    backgroundColor: 'hexa color code',
    backgroundImage: 'image-url',
    backgroundImagePosition: 'top || middle || bottom',
    backgroundImageDisplay: 'cover || contain',
    backgroundImageScrolling: 'fixed || scroll || paralax',
    backgrounOpacity: 1 // từ 0 đến 1
  },

  // Một section có thể có hoặc ko có heading
  // heading: null,
  heading: heading,

  // Một section có thể có hoặc ko có content (description content)
  // content: null,
  content: content,

  // Một section có thể có hoặc ko có components (thường phải có, nếu ko có nghĩa là basic components: chỉ có background, heading, content)
  // component: null,
  component: imageWithContent
  // component: imageCarousel
  // component: videoGallery
};
