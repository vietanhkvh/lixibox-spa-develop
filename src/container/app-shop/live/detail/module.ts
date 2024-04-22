export const tranformCommentItem = (comment, isDisplayOnThread = false) => {
  if (!comment) return null;

  const userAvatar = (!!comment.commenter && !!comment.commenter.avatar && comment.commenter.avatar.medium_url) || '';
  const username = (!!comment.commenter && `${comment.commenter.last_name} ${comment.commenter.first_name}`) || '';
  const userMobileReferralCode = (!!comment.commenter && comment.commenter.mobile_referral_code) || '';
  const replyTo = !comment.comment
    ? null
    : {
        id: comment.comment.id,
        content: comment.comment.content,
        createdAt: comment.comment.created_at
      };

  return {
    id: comment.id,
    content: comment.content,
    userAvatar,
    username,
    createdAt: comment.created_at,
    repliesCount: comment.replies_count,
    isDisplayOnThread,
    userMobileReferralCode,
    replyTo
  };
};

export const tranformCommentList = (commentList, isDisplayOnThread = false) => {
  if (!commentList || !commentList.length) return [];

  return commentList.map((comment) => tranformCommentItem(comment, isDisplayOnThread));
};

const tranformProduct = ({ id, name, slug, price, primary_picture }) => ({
  id,
  name,
  slug,
  price,
  image: primary_picture.medium_url || ''
});

export const tranformProductList = (productList) => {
  if (!productList || !productList.length) return [];

  return productList.map(tranformProduct);
};
