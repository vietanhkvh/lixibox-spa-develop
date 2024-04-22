import classNames from 'classnames';

import Invitation from '../../invitation';
import InvitationMobileRefferal from '../../invitation-mobile-refferal';
import style from './style.module.scss';

const UserInvitation = () => {
  return (
    <div className={classNames(style.userInvitation)}>
      <div className={style.title}>Mã giới thiệu dành riêng cho App</div>
      <InvitationMobileRefferal className={style.invitation} scoopClass={style.scoopClass} />
      <div className={style.title}>Link giới thiệu dành riêng cho Web</div>
      <Invitation classes={{ container: style.invitation, scoop: style.invitationScoop }} />
      <div className={style.additionalNotes}>
        *Vui lòng không chia sẻ, bình luận có chứa mã giới thiệu của bạn hoặc nội dung có liên quan đến chương trình
        trên các kênh của Lixibox (Lixibox Facebook Fanpage, Lixibox Feed, Mục thảo luận, Đánh giá sản phẩm)
      </div>
    </div>
  );
};

export default UserInvitation;
