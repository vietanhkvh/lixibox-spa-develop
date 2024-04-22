import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import SvgIcon from 'presentation-component/ui/icon';
import InputField from 'presentation-component/ui/input-field';
import WrapLayout from 'container/layout/wrap/container';
import NoContent from 'container/exception/404';
import { connect } from 'react-redux';
import { IBrandList } from './model';
import style from './style.module.scss';
import { mapDispatchToProps, mapStateToProps } from './store';
import { changeAlias } from 'utils/format';
import { ROUTING_BRAND_DETAIL_PATH } from 'routings/path';
import { ERROR_TEXT_NO_ICON } from 'config';
import { CDN_ASSETS_PREFIX } from 'utils/uri';
import Loading from 'components/ui/loading';

const Search = ({ onChange, searchBrandValue }) => {
  const inputProps = {
    title: '',
    isRoundedStyle: true,
    placeholder: 'Tìm kiếm',
    onChange: (e) => onChange(e.target.value),
    name: 'searchBrand',
    classes: { container: style.searchInput, input: style.innerInput },
    value: searchBrandValue
  };

  const iconProps = {
    name: 'search',
    className: style.searchBrandIcon
  };

  return (
    <div className={style.searchBrand}>
      <SvgIcon {...iconProps} />
      <InputField {...inputProps} />
    </div>
  );
};

const BrandActive = ({ alphabets, idActive, handleSelect }) => {
  return (
    <div className={style.alphabets}>
      {Array.isArray(alphabets) &&
        alphabets.map((i, index) => (
          <div
            className={classnames(style.alphabet, idActive === i && style.active)}
            key={`alphabet-brand-${i}`}
            onClick={() => handleSelect(i, index)}
          >
            {i}
          </div>
        ))}
    </div>
  );
};
const brandsRaw = [
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
        brand_image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/brands/brand_images/000/000/246/original/logo.png',
        description:
          'April skin là một thương hiệu mỹ phẩm nổi tiếng hàng đầu tại Hàn Quốc, từng nhận được rất nhiều giải thưởng uy tín cho việc phát triển những dòng sản phẩm từ thiên nhiên thân thiện với sức khỏe và mang đến những công dụng hữu hiệu nhất trong việc làm đẹp đối với phái nữ.',
        id: 246,
        name: 'April Skin',
        slug: 'arpil-skin'
      },
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
        brand_image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/brands/brand_images/000/000/246/original/logo.png',
        description:
          'April skin là một thương hiệu mỹ phẩm nổi tiếng hàng đầu tại Hàn Quốc, từng nhận được rất nhiều giải thưởng uy tín cho việc phát triển những dòng sản phẩm từ thiên nhiên thân thiện với sức khỏe và mang đến những công dụng hữu hiệu nhất trong việc làm đẹp đối với phái nữ.',
        id: 246,
        name: 'April Skin',
        slug: 'arpil-skin'
      },
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
        brand_image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/brands/brand_images/000/000/246/original/logo.png',
        description:
          'April skin là một thương hiệu mỹ phẩm nổi tiếng hàng đầu tại Hàn Quốc, từng nhận được rất nhiều giải thưởng uy tín cho việc phát triển những dòng sản phẩm từ thiên nhiên thân thiện với sức khỏe và mang đến những công dụng hữu hiệu nhất trong việc làm đẹp đối với phái nữ.',
        id: 246,
        name: 'April Skin',
        slug: 'arpil-skin'
      },
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
        brand_image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/brands/brand_images/000/000/246/original/logo.png',
        description:
          'April skin là một thương hiệu mỹ phẩm nổi tiếng hàng đầu tại Hàn Quốc, từng nhận được rất nhiều giải thưởng uy tín cho việc phát triển những dòng sản phẩm từ thiên nhiên thân thiện với sức khỏe và mang đến những công dụng hữu hiệu nhất trong việc làm đẹp đối với phái nữ.',
        id: 246,
        name: 'April Skin',
        slug: 'arpil-skin'
      },
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
        brand_image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/brands/brand_images/000/000/246/original/logo.png',
        description:
          'April skin là một thương hiệu mỹ phẩm nổi tiếng hàng đầu tại Hàn Quốc, từng nhận được rất nhiều giải thưởng uy tín cho việc phát triển những dòng sản phẩm từ thiên nhiên thân thiện với sức khỏe và mang đến những công dụng hữu hiệu nhất trong việc làm đẹp đối với phái nữ.',
        id: 246,
        name: 'April Skin',
        slug: 'arpil-skin'
      },
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
        brand_image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/brands/brand_images/000/000/246/original/logo.png',
        description:
          'April skin là một thương hiệu mỹ phẩm nổi tiếng hàng đầu tại Hàn Quốc, từng nhận được rất nhiều giải thưởng uy tín cho việc phát triển những dòng sản phẩm từ thiên nhiên thân thiện với sức khỏe và mang đến những công dụng hữu hiệu nhất trong việc làm đẹp đối với phái nữ.',
        id: 246,
        name: 'April Skin',
        slug: 'arpil-skin'
      },
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
        brand_image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/brands/brand_images/000/000/246/original/logo.png',
        description:
          'April skin là một thương hiệu mỹ phẩm nổi tiếng hàng đầu tại Hàn Quốc, từng nhận được rất nhiều giải thưởng uy tín cho việc phát triển những dòng sản phẩm từ thiên nhiên thân thiện với sức khỏe và mang đến những công dụng hữu hiệu nhất trong việc làm đẹp đối với phái nữ.',
        id: 246,
        name: 'April Skin',
        slug: 'arpil-skin'
      },
      {
        brand_image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/brands/brand_images/000/000/246/original/logo.png',
        description:
          'April skin là một thương hiệu mỹ phẩm nổi tiếng hàng đầu tại Hàn Quốc, từng nhận được rất nhiều giải thưởng uy tín cho việc phát triển những dòng sản phẩm từ thiên nhiên thân thiện với sức khỏe và mang đến những công dụng hữu hiệu nhất trong việc làm đẹp đối với phái nữ.',
        id: 246,
        name: 'April Skin',
        slug: 'arpil-skin'
      }
    ]
  },
  {
    B: [
      {
        brand_image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/brands/brand_images/000/000/246/original/logo.png',
        description:
          'Bpril skin là một thương hiệu mỹ phẩm nổi tiếng hàng đầu tại Hàn Quốc, từng nhận được rất nhiều giải thưởng uy tín cho việc phát triển những dòng sản phẩm từ thiên nhiên thân thiện với sức khỏe và mang đến những công dụng hữu hiệu nhất trong việc làm đẹp đối với phái nữ.',
        id: 246,
        name: 'Bpril Skin',
        slug: 'arpil-skin'
      },
      {
        brand_image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/brands/brand_images/000/000/246/original/logo.png',
        description:
          'Bpril skin là một thương hiệu mỹ phẩm nổi tiếng hàng đầu tại Hàn Quốc, từng nhận được rất nhiều giải thưởng uy tín cho việc phát triển những dòng sản phẩm từ thiên nhiên thân thiện với sức khỏe và mang đến những công dụng hữu hiệu nhất trong việc làm đẹp đối với phái nữ.',
        id: 246,
        name: 'Bpril Skin',
        slug: 'arpil-skin'
      },
      {
        brand_image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/brands/brand_images/000/000/246/original/logo.png',
        description:
          'Bpril skin là một thương hiệu mỹ phẩm nổi tiếng hàng đầu tại Hàn Quốc, từng nhận được rất nhiều giải thưởng uy tín cho việc phát triển những dòng sản phẩm từ thiên nhiên thân thiện với sức khỏe và mang đến những công dụng hữu hiệu nhất trong việc làm đẹp đối với phái nữ.',
        id: 246,
        name: 'Bpril Skin',
        slug: 'arpil-skin'
      }
    ]
  },
  {
    C: [
      {
        brand_image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/brands/brand_images/000/000/246/original/logo.png',
        description:
          'Cpril skin là một thương hiệu mỹ phẩm nổi tiếng hàng đầu tại Hàn Quốc, từng nhận được rất nhiều giải thưởng uy tín cho việc phát triển những dòng sản phẩm từ thiên nhiên thân thiện với sức khỏe và mang đến những công dụng hữu hiệu nhất trong việc làm đẹp đối với phái nữ.',
        id: 246,
        name: 'Cpril Skin',
        slug: 'arpil-skin'
      },
      {
        brand_image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/brands/brand_images/000/000/246/original/logo.png',
        description:
          'Cpril skin là một thương hiệu mỹ phẩm nổi tiếng hàng đầu tại Hàn Quốc, từng nhận được rất nhiều giải thưởng uy tín cho việc phát triển những dòng sản phẩm từ thiên nhiên thân thiện với sức khỏe và mang đến những công dụng hữu hiệu nhất trong việc làm đẹp đối với phái nữ.',
        id: 246,
        name: 'Cpril Skin',
        slug: 'arpil-skin'
      },
      {
        brand_image_url:
          'https://s3-ap-southeast-1.amazonaws.com/lixibox-staging-uploads/system/brands/brand_images/000/000/246/original/logo.png',
        description:
          'Cpril skin là một thương hiệu mỹ phẩm nổi tiếng hàng đầu tại Hàn Quốc, từng nhận được rất nhiều giải thưởng uy tín cho việc phát triển những dòng sản phẩm từ thiên nhiên thân thiện với sức khỏe và mang đến những công dụng hữu hiệu nhất trong việc làm đẹp đối với phái nữ.',
        id: 246,
        name: 'Cpril Skin',
        slug: 'arpil-skin'
      }
    ]
  }
];

const Brands = forwardRef(({ brands, column, idActive }: any, ref: any) => {
  let templateColumn = '';
  [...Array(column)].forEach((_) => (templateColumn += `calc(100% / ${column} - calc(50px / ${column}))`)); //

  const Items = ({ content }) => {
    return (
      <div className={style.items} style={{ gridTemplateColumns: templateColumn }}>
        {Array.isArray(content) &&
          content.map((item) => {
            const { id, name, slug } = item;
            return (
              <NavLink key={`brand-name-${id}`} className={style.item} to={`${ROUTING_BRAND_DETAIL_PATH}/${slug}`}>
                {name}
              </NavLink>
            );
          })}
      </div>
    );
  };

  return (
    <div className={style.brands}>
      {Array.isArray(brands) &&
        brands.map((item, index) => {
          const { id, content } = item;
          return (
            <div
              key={`brand-page-item-${id}`}
              className={classnames(style.brand, idActive === id && style.activeList)}
              ref={(e) => (ref.current[index] = e)}
            >
              <div className={style.index}>{id.toUpperCase()}</div>
              <div className={style.divide} />
              <Items content={content} />
            </div>
          );
        })}
    </div>
  );
});

const BrandList: React.FC<IBrandList> = (props) => {
  const {
    fetchBrandListAction,
    brandStore: { list = brandsRaw, isFetchingBrand },
    updateMetaInfoAction
  } = props;
  const [searchBrandValue, setSearch] = useState('');
  const [idActive, setIdActive] = useState('');
  const brandsRef = useRef<Array<any>>([]);

  useEffect(() => {
    fetchBrandListAction();
    updateMetaInfoAction({
      info: {
        url: `https://www.lixibox.com`,
        type: 'article',
        title: '100+ thương hiệu mỹ phẩm luxury hàng đầu tại Lixibox!',
        description: 'Thương hiệu mỹ phẩm luxury hàng đầu tại Lixibox!',
        keyword:
          'máy rửa mặt, halio, mỹ phẩm, dưỡng da, trị mụn, skincare, makeup, lustre, Lixibox Brands, Mỹ phẩm luxury',
        image: CDN_ASSETS_PREFIX('/meta/cover.png')
      },
      structuredData: {
        breadcrumbList: []
      }
    });
  }, []);

  const combinedBrands =
    list &&
    list.map((b) => {
      const character = Object.keys(b)[0];
      return {
        id: character,
        content: b[character]
      };
    });

  const listBrand =
    combinedBrands &&
    combinedBrands
      .map((brand) => {
        const { id, content } = brand;
        const re = content.filter((item) => {
          if (!searchBrandValue && !searchBrandValue.length) return true;
          return changeAlias(item.name).indexOf(changeAlias(searchBrandValue)) >= 0;
        });

        return {
          id: id,
          content: re
        };
      })
      .filter((item) => item.content.length > 0 && item);

  const alphabets = listBrand && listBrand.map((i) => i.id);

  const onChange = (val) => {
    setSearch(val);
  };

  const onSelectBrand = (id) => {
    setIdActive(id);
  };

  const onScroll = (index) => {
    brandsRef?.current[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleSelect = (id, index) => {
    onScroll(index);
    onSelectBrand(id);
  };

  const onReset = () => {
    onSelectBrand('');
    onChange('');
  };

  const headerProps = {
    onChange,
    searchBrandValue
  };

  const noContentProps = { isShowNavigation: false, isShowMetaInfor: false, ...ERROR_TEXT_NO_ICON };

  return (
    <WrapLayout className={style.container}>
      <div className={style.header}>
        <Search {...headerProps} />
        <BrandActive alphabets={alphabets} idActive={idActive} handleSelect={handleSelect} />
        <SvgIcon name="trash" className={style.icon} onClick={onReset} />
      </div>
      {isFetchingBrand ? (
        <div className={style.loading}>
          <Loading style={{ height: 'initial' }} />
        </div>
      ) : !Array.isArray(list) || list.length === 0 ? (
        <NoContent {...noContentProps} />
      ) : (
        <Brands brands={listBrand} idActive={idActive} column={6} ref={brandsRef} />
      )}
    </WrapLayout>
  );
};

export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(BrandList);
