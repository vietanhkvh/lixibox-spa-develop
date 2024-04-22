import classNames from 'classnames';

import { isUndefined } from '../../../../utils/validate';
import { objectToHash } from '../../../../utils/encode';
import { MAGAZINE_LIST_TYPE } from '../../../../constants/application/magazine';
import Page404 from '../../../exception/404';
import BlogDetail from '../../../../components/magazine/blog-detail';

import MagazineVideo from '../video';

import STYLE from './style';
import { IProps } from './model';
import WrapLayout from '../../../layout/wrap';

const renderDesktop = ({ props }) => {
  const {
    match: {
      params: { idPost }
    },
    authStore: { userInfo },
    magazineStore: { magazineBySlug, magazineRelatedBlog, isMagazineDetailNotFound },
    openModalAction,
    likeProductAction,
    unLikeProductAction,
    likedIdList
  } = props as IProps;

  const keyHash = objectToHash({ slug: idPost });
  const magazineBySlugList = !isUndefined(magazineBySlug[keyHash]) ? magazineBySlug[keyHash].magazine : {};
  const magazineRelatedBlogList =
    magazineRelatedBlog && !isUndefined(magazineRelatedBlog[keyHash]) ? magazineRelatedBlog[keyHash] : [];

  const blogDetailProps = {
    userInfo: userInfo,
    magazine: magazineBySlugList,
    openModalAction,
    likeProductAction,
    unLikeProductAction,
    likedIdList,
    idPost,
    magazineRelatedBlogList
  };

  if (!!isMagazineDetailNotFound) {
    return <Page404 />;
  }

  return !!magazineBySlugList && magazineBySlugList.post_type === MAGAZINE_LIST_TYPE.VIDEO ? (
    <MagazineVideo content={magazineBySlugList} />
  ) : (
    <div style={STYLE.desktop} className={classNames('user-select-all', 'magazinePostDetail')}>
      <WrapLayout style={STYLE.desktop.wrap}>
        <BlogDetail {...blogDetailProps} />
      </WrapLayout>
    </div>
  );
};

export default renderDesktop;
