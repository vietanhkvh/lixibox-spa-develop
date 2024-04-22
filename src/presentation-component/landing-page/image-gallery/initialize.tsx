const defaultDataItem = {
  size: 'medium',
  imageFlexRatio: 5,
  link: '',
  imagePosition: 'top',
  textWrapAlign: 'center',
  image: {
    ratio: '1:1',
    radius: 'none',
    link: '',
    src: '',
    position: 'center-center',
    display: 'contain'
  },
  heading: {
    text: 'Heading Text',
    size: 'small',
    color: '#202020',
    fontSize: 'large',
    fontWeight: 'bold',
    textAlign: 'center' as const
  },
  content: {
    text: 'Detail Content Text Detail Content Text Detail Content Text Detail Content Text Detail Content Text Detail Content Text Detail Content Text',
    size: 'small',
    color: '#757779',
    fontSize: 'medium',
    fontWeight: 'regular',
    textAlign: 'center' as const
  }
};

export const defaultDataList = [
  defaultDataItem,
  defaultDataItem,
  defaultDataItem,
  defaultDataItem,
  defaultDataItem,
  defaultDataItem,
  defaultDataItem,
  defaultDataItem,
  defaultDataItem,
  defaultDataItem,
  defaultDataItem,
  defaultDataItem
];
