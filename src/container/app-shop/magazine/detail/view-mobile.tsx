import classNames from 'classnames';

import { isUndefined } from '../../../../utils/validate';
import { objectToHash } from '../../../../utils/encode';
import { MAGAZINE_LIST_TYPE } from '../../../../constants/application/magazine';
import Page404 from '../../../exception/404';
import BlogDetail from '../../../../components/magazine/blog-detail';

import MagazineVideo from '../video';
import { IProps } from './model';

const renderMobile = ({ props, state }) => {
  const {
    authStore: { userInfo },
    match: {
      params: { idPost }
    },
    magazineStore: {
      magazineBySlug,
      magazineRelatedBlog,
      isMagazineDetailNotFound,
      openModalAction,
      likeProductAction,
      unLikeProductAction
    },
    likedIdList
  } = props as IProps;

  const keyHash = objectToHash({ slug: idPost });
  const magazineBySlugList = isUndefined(magazineBySlug[keyHash]) ? [] : magazineBySlug[keyHash].magazine;
  const magazineRelatedBlogList =
    magazineRelatedBlog && !isUndefined(magazineRelatedBlog[keyHash]) ? magazineRelatedBlog[keyHash] : [];

  if (!!isMagazineDetailNotFound) {
    return <Page404 />;
  }

  const blogDetailProps = {
    idPost,
    magazine: magazineBySlugList,
    magazineRelatedBlogList,
    userInfo: userInfo,
    openModalAction,
    likeProductAction,
    unLikeProductAction,
    likedIdList
  };

  return !!magazineBySlugList && magazineBySlugList.post_type === MAGAZINE_LIST_TYPE.VIDEO ? (
    <MagazineVideo content={magazineBySlugList} />
  ) : (
    <div className={classNames('magazine-detail-container', 'magazinePostDetail')}>
      <BlogDetail {...blogDetailProps} />
    </div>
  );
};

export default renderMobile;
