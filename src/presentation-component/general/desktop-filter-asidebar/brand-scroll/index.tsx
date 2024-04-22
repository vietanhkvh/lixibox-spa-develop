import React, { useRef, forwardRef, useState, useCallback, useEffect } from 'react'; //useCallback
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import style from './style.module.scss';
import { scrollElement } from 'utils/scroll';
import { IBrandList, IBrandScroll, IIndexAlphabet } from '../model';

export const IndexAlphabet: React.FC<IIndexAlphabet> = forwardRef((props, ref: any) => {
  const { list, hoverID, handleScrollView } = props;
  return (
    <div className={style.index} ref={ref}>
      {list.map((i, index) => {
        const props = {
          className: classnames(style.item, hoverID === i && style.active),
          key: `alphabet-${index}`,
          onMouseEnter: () => handleScrollView(i),
          onClick: () => handleScrollView(i)
        };
        return <div {...props}>{i}</div>;
      })}
    </div>
  );
});

export const BrandList: React.FC<IBrandList> = forwardRef((props, ref: any) => {
  const { brands, height, setHoverID } = props;
  const containerRef = useRef<any>(null);

  const onScroll = () => {
    const scrollTop = containerRef.current.scrollTop;

    onScrollChange(scrollTop);
  };

  const onScrollChange = useCallback(
    (scrollTop) => {
      const marginEl = ref.current?.[0]?.offsetTop + 24;
      const idCharacterScroll = ref.current.findIndex((cRef: any) => {
        return cRef?.offsetTop - marginEl <= scrollTop && scrollTop <= cRef?.offsetTop + cRef?.clientHeight - marginEl;
      });

      idCharacterScroll > 0 && setHoverID(brands[idCharacterScroll]?.id);
    },
    [brands, ref, setHoverID]
  );

  const Brand = forwardRef(({ item, index }: any, ref: any) => {
    return (
      <div
        id={`new-brand-alphabet-${item.id}`}
        key={`brand-${index}`}
        className={style.item}
        ref={(e) => (ref.current[index] = e)}
      >
        <div className={style.header}>{item.title}</div>
        <div className={style.content}>
          {item.content.map((c, index) => (
            <NavLink key={`brand-name-${index}=${c}`} className={style.name} to={c.slug}>
              {c.name}
            </NavLink>
          ))}
        </div>
      </div>
    );
  });

  return (
    <div className={style.brand} style={{ maxHeight: height }} ref={containerRef} onScroll={onScroll}>
      {brands.map((b, index) => {
        return <Brand key={`brand-group-${b.id}`} item={b} index={index} ref={ref} />;
      })}
    </div>
  );
});

export const brandRaw = [
  {
    '#': [
      {
        brand_image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/brands/brand_images/000/000/246/original/logo.png',
        description:
          'April skin là một thương hiệu mỹ phẩm nổi tiếng hàng đầu tại Hàn Quốc, từng nhận được rất nhiều giải thưởng uy tín cho việc phát triển những dòng sản phẩm từ thiên nhiên thân thiện với sức khỏe và mang đến những công dụng hữu hiệu nhất trong việc làm đẹp đối với phái nữ.',
        id: 246,
        name: 'April Skin',
        slug: 'arpil-skin'
      },
      {
        brand_image_url: '/images/original/missing.png',
        description: null,
        id: 284,
        name: 'Artis',
        slug: 'artis'
      }
    ]
  },
  {
    A: [
      {
        brand_image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/brands/brand_images/000/000/246/original/logo.png',
        description:
          'April skin là một thương hiệu mỹ phẩm nổi tiếng hàng đầu tại Hàn Quốc, từng nhận được rất nhiều giải thưởng uy tín cho việc phát triển những dòng sản phẩm từ thiên nhiên thân thiện với sức khỏe và mang đến những công dụng hữu hiệu nhất trong việc làm đẹp đối với phái nữ.',
        id: 246,
        name: 'April Skin',
        slug: 'arpil-skin'
      },
      {
        brand_image_url: '/images/original/missing.png',
        description: null,
        id: 284,
        name: 'Artis',
        slug: 'artis'
      }
    ]
  },
  {
    B: [
      {
        brand_image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/brands/brand_images/000/000/246/original/logo.png',
        description:
          'April skin là một thương hiệu mỹ phẩm nổi tiếng hàng đầu tại Hàn Quốc, từng nhận được rất nhiều giải thưởng uy tín cho việc phát triển những dòng sản phẩm từ thiên nhiên thân thiện với sức khỏe và mang đến những công dụng hữu hiệu nhất trong việc làm đẹp đối với phái nữ.',
        id: 246,
        name: 'April Skin',
        slug: 'arpil-skin'
      },
      {
        brand_image_url: '/images/original/missing.png',
        description: null,
        id: 284,
        name: 'Artis',
        slug: 'artis'
      }
    ]
  },
  {
    C: [
      {
        brand_image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/brands/brand_images/000/000/246/original/logo.png',
        description:
          'April skin là một thương hiệu mỹ phẩm nổi tiếng hàng đầu tại Hàn Quốc, từng nhận được rất nhiều giải thưởng uy tín cho việc phát triển những dòng sản phẩm từ thiên nhiên thân thiện với sức khỏe và mang đến những công dụng hữu hiệu nhất trong việc làm đẹp đối với phái nữ.',
        id: 246,
        name: 'April Skin',
        slug: 'arpil-skin'
      },
      {
        brand_image_url: '/images/original/missing.png',
        description: null,
        id: 284,
        name: 'Artis',
        slug: 'artis'
      }
    ]
  },
  {
    D: [
      {
        brand_image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/brands/brand_images/000/000/246/original/logo.png',
        description:
          'April skin là một thương hiệu mỹ phẩm nổi tiếng hàng đầu tại Hàn Quốc, từng nhận được rất nhiều giải thưởng uy tín cho việc phát triển những dòng sản phẩm từ thiên nhiên thân thiện với sức khỏe và mang đến những công dụng hữu hiệu nhất trong việc làm đẹp đối với phái nữ.',
        id: 246,
        name: 'April Skin',
        slug: 'arpil-skin'
      },
      {
        brand_image_url: '/images/original/missing.png',
        description: null,
        id: 284,
        name: 'Artis',
        slug: 'artis'
      }
    ]
  },
  {
    E: [
      {
        brand_image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/brands/brand_images/000/000/246/original/logo.png',
        description:
          'April skin là một thương hiệu mỹ phẩm nổi tiếng hàng đầu tại Hàn Quốc, từng nhận được rất nhiều giải thưởng uy tín cho việc phát triển những dòng sản phẩm từ thiên nhiên thân thiện với sức khỏe và mang đến những công dụng hữu hiệu nhất trong việc làm đẹp đối với phái nữ.',
        id: 246,
        name: 'April Skin',
        slug: 'arpil-skin'
      },
      {
        brand_image_url: '/images/original/missing.png',
        description: null,
        id: 284,
        name: 'Artis',
        slug: 'artis'
      }
    ]
  },
  {
    F: [
      {
        brand_image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/brands/brand_images/000/000/246/original/logo.png',
        description:
          'April skin là một thương hiệu mỹ phẩm nổi tiếng hàng đầu tại Hàn Quốc, từng nhận được rất nhiều giải thưởng uy tín cho việc phát triển những dòng sản phẩm từ thiên nhiên thân thiện với sức khỏe và mang đến những công dụng hữu hiệu nhất trong việc làm đẹp đối với phái nữ.',
        id: 246,
        name: 'April Skin',
        slug: 'arpil-skin'
      },
      {
        brand_image_url: '/images/original/missing.png',
        description: null,
        id: 284,
        name: 'Artis',
        slug: 'artis'
      }
    ]
  },
  {
    J: [
      {
        brand_image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/brands/brand_images/000/000/246/original/logo.png',
        description:
          'April skin là một thương hiệu mỹ phẩm nổi tiếng hàng đầu tại Hàn Quốc, từng nhận được rất nhiều giải thưởng uy tín cho việc phát triển những dòng sản phẩm từ thiên nhiên thân thiện với sức khỏe và mang đến những công dụng hữu hiệu nhất trong việc làm đẹp đối với phái nữ.',
        id: 246,
        name: 'April Skin',
        slug: 'arpil-skin'
      },
      {
        brand_image_url: '/images/original/missing.png',
        description: null,
        id: 284,
        name: 'Artis',
        slug: 'artis'
      }
    ]
  }
];

const BrandScroll: React.FC<IBrandScroll> = (props) => {
  const { brandsList = brandRaw, classes = {} } = props;
  const { container = '', header = '', content = '' } = classes;
  const [hoverID, setHoverID] = useState('#');
  const indexRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<any>('initial');
  const brandRef = useRef<any>([]);

  const combinedBrands = Array.isArray(brandsList)
    ? brandsList?.map((item) => {
        const key = Object.keys(item)[0];
        return {
          id: key,
          title: key,
          content: item[key]
        };
      })
    : [];
  const alphabets = combinedBrands?.map((i) => i.id);

  //Event
  const handleScrollView = (id) => {
    const el = document.getElementById(`new-brand-alphabet-${id}`);
    if (el !== null) {
      const position = window.pageYOffset;
      el.scrollIntoView();
      scrollElement({ x: 0, y: position });
      setHoverID(id);
    }
  };
  const indexProps = {
    list: alphabets,
    hoverID,
    ref: indexRef,
    handleScrollView
  };

  useEffect(() => {
    const indexHeight = indexRef.current?.clientHeight;
    if (indexHeight) setHeight(indexHeight);
  }, [indexRef.current?.clientHeight]);

  const brandProps = {
    brands: combinedBrands,
    height,
    setHoverID,
    hoverID,
    ref: brandRef
  };

  return (
    <div className={classnames(style.container, !!container && container)}>
      <div className={classnames(style.header, !!header && header)}>{`Danh sách thương hiệu`}</div>
      <div className={classnames(style.content, !!content && content)}>
        <IndexAlphabet {...indexProps} />
        <BrandList {...brandProps} />
      </div>
    </div>
  );
};

export default BrandScroll;
