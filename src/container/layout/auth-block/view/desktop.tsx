import { isEmptyObject } from 'utils/validate';
import classNames from 'classnames';
import { IProps } from '../model';
import STYLE from './style';

const View = ({
  title,
  description,
  descriptionVisibility,
  secondDescription,
  subContainer,
  mainContainer,
  style,
  classes,
  userReferrerProfile
}: IProps) => {
  const avatarUrl = userReferrerProfile?.avatar?.original_url || '';
  const userName = `${userReferrerProfile?.last_name} ${userReferrerProfile?.first_name}`;

  return (
    <div id={'auth-block'} className={classNames(classes?.container)} style={Object.assign({}, STYLE.container, style)}>
      <div style={STYLE.leftContent}>
        <div style={STYLE.leftContent.backdrop}></div>

        <div style={STYLE.innerContent}>
          {/* Header */}
          <div style={STYLE.leftContent.topInfo}>
            <div style={STYLE.leftContent.topInfo.heading}>
              {title}
              <span style={STYLE.leftContent.topInfo.heading.border}></span>
            </div>

            {!isEmptyObject(userReferrerProfile) ? (
              // Promotion
              <div>
                <div style={STYLE.leftContent.promotion.avatarWrap}>
                  <div style={STYLE.leftContent.promotion.avatar(avatarUrl)}></div>
                </div>
                <div style={STYLE.leftContent.promotion.title}>
                  {userName} tặng bạn một vài món quà khi mua sắm tại Lixibox
                </div>
                <div style={STYLE.leftContent.promotion.note}>
                  Đăng ký ngay hôm nay để được nhận quà tặng cho đơn hàng đầu tiên.
                </div>
              </div>
            ) : (
              descriptionVisibility.desktop && (
                <div style={STYLE.leftContent.topInfo.textDescription}>{description}</div>
              )
            )}

            {!!secondDescription && !!secondDescription.length && (
              <div style={STYLE.leftContent.topInfo.textDescription}>{secondDescription}</div>
            )}
          </div>
          {/* Sub container */}
          <div style={STYLE.leftContent.bottomInfo}>{subContainer}</div>
        </div>
      </div>
      {/* Main container */}
      <div style={STYLE.rightContent}>
        <div style={STYLE.innerContentRight}>{mainContainer}</div>
      </div>
    </div>
  );
};

export default View;
