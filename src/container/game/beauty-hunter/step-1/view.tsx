import Image from 'presentation-component/ui/image';
import { CDN_ASSETS_PREFIX } from '../../../../utils/uri';
import { numberFormat } from '../../../../utils/format';
import Loading from '../../../../components/ui/loading';
import { currenyFormat } from '../../../../utils/currency';

import STYLE from './style';

const s1Tab1 = CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s1-tab-1.png');
const s1Tab2 = CDN_ASSETS_PREFIX('/game/beauty-hunter-assets/s1-tab-2.png');

const renderView = ({
  props,
  state,
  handleChangeTab,
  handleShowHideInfo,
  handlePlay,
  handleShowHideRedeem,
  handleRedeemPlayTimes
}) => {
  const { gameStore, cartStore } = props;
  const { tab, isShowInfo, isShowRedeem, redeemResultMessage } = state;
  return (
    <div style={STYLE.container}>
      <div style={STYLE.info}>
        <div className={'bgrgame'} style={STYLE.info.bgLight} />
        <div className={'gamegrd'} style={STYLE.info.bgGradient} />
        <div style={STYLE.info.content}>
          <div style={STYLE.info.contentInfo}>
            <div style={STYLE.info.contentInfoPanel}>
              <div className={'phone-shake'} style={STYLE.info.phone} />
              <div style={STYLE.info.slogan} />
              {!gameStore.isLoadingGame && !!gameStore.loadGame && gameStore.loadGame.status === 'started' && (
                <div className={'play'} style={STYLE.info.play} onClick={() => handlePlay()}>
                  Bấm & Lắc
                </div>
              )}
              {!gameStore.isLoadingGame &&
                !!gameStore.loadGame &&
                gameStore.loadGame.status === 'finished' &&
                (gameStore.loadGame.profile.available_redeem_times > 0 ? (
                  <div
                    className={'play'}
                    style={Object.assign({}, STYLE.info.playAgain, STYLE.info.getMore)}
                    onClick={() => handleShowHideRedeem(true)}
                  >
                    Nhận thêm lượt chơi
                  </div>
                ) : (
                  <div className={'play'} style={Object.assign({}, STYLE.info.playAgain)}>
                    Chơi tiếp vào ngày mai
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div style={STYLE.info.bgFlora} />
        <div className={'diamond'} style={Object.assign({}, STYLE.info.diamond, STYLE.info.diamond1)} />
        <div className={'diamond'} style={Object.assign({}, STYLE.info.diamond, STYLE.info.diamond2)} />
        <div className={'diamond'} style={Object.assign({}, STYLE.info.diamond, STYLE.info.diamond3)} />
        <div className={'diamond'} style={Object.assign({}, STYLE.info.diamond, STYLE.info.diamond4)} />
        <div className={'diamond'} style={Object.assign({}, STYLE.info.diamond, STYLE.info.diamond5)} />
      </div>
      <div style={STYLE.gift}>
        <div style={STYLE.gift.tab}>
          <div style={STYLE.gift.tabLine} />
          <div
            style={Object.assign({}, STYLE.gift.tabItem, tab === 1 && STYLE.gift.tabActive)}
            onClick={() => handleChangeTab(1)}
          >
            <Image alt={''} src={s1Tab1} style={STYLE.gift.tabImage} />
          </div>
          <div
            style={Object.assign({}, STYLE.gift.tabItem, tab === 2 && STYLE.gift.tabActive)}
            onClick={() => handleChangeTab(2)}
          >
            <Image alt={''} src={s1Tab2} style={STYLE.gift.tabImage} />
          </div>
          <div
            style={Object.assign({}, STYLE.gift.tabItem, STYLE.gift.tabInfo)}
            onClick={() => handleShowHideInfo(true)}
          >
            ?
          </div>
        </div>
        <div style={STYLE.gift.list}>
          {tab === 1 && (
            <div style={STYLE.gift.listPanel}>
              {!!gameStore.isLoadingTodayGift && <Loading style={{ height: 80 }} />}
              {!gameStore.isLoadingTodayGift &&
                !!gameStore.todayGift &&
                gameStore.todayGift.map((item) => (
                  <div style={STYLE.gift.listItem}>
                    <Image alt={''} src={item.primary_picture.medium_url} style={STYLE.gift.listItemAvatar} />
                    <div style={STYLE.gift.listItemName}>
                      {currenyFormat(item.original_price / 1000)}K - {item.name}
                    </div>
                  </div>
                ))}
            </div>
          )}
          {tab === 2 && (
            <div style={STYLE.gift.listPanel}>
              {!gameStore.isLoadingUserGift && gameStore.userGift.length === 0 && (
                <div style={STYLE.gift.emptyGift}>{'Tham gia ngay và nhận quà cùng Lixibox'}</div>
              )}
              {!!gameStore.isLoadingUserGift && <Loading style={{ height: 80 }} />}
              {!gameStore.isLoadingUserGift &&
                Array.isArray(gameStore.userGift) &&
                gameStore.userGift.map((item, $index) => {
                  if ('coin' === item.reward.reward_type || 'balance' === item.reward.reward_type) {
                    return (
                      <div
                        style={Object.assign(
                          {},
                          STYLE.gift.listItem,
                          gameStore.userGift.length - 1 === $index && STYLE.gift.lastItem
                        )}
                      >
                        <Image
                          src={CDN_ASSETS_PREFIX(
                            `/game/beauty-hunter-assets/${item.reward.reward_type}-${item.reward.value}.png`
                          )}
                          style={STYLE.gift.listItemAvatar}
                        />
                        <div style={STYLE.gift.listItemName}>
                          Bạn đã nhận được {currenyFormat(item.reward.value)}{' '}
                          {'coin' === item.reward.reward_type && 'lixicoin'}
                          {'balance' === item.reward.reward_type && 'vnđ'}
                        </div>
                      </div>
                    );
                  }

                  if (
                    'gift' === item.reward.reward_type &&
                    !!item &&
                    !!item.reward &&
                    !!item.reward.linked_object &&
                    !!item.reward.linked_object.box_basic
                  ) {
                    return (
                      <div
                        style={Object.assign(
                          {},
                          STYLE.gift.listItem,
                          gameStore.userGift.length - 1 === $index && STYLE.gift.lastItem
                        )}
                      >
                        <Image
                          src={item.reward.linked_object.box_basic.primary_picture.medium_url}
                          style={STYLE.gift.listItemAvatar}
                        />
                        {item.reward.linked_object.box_basic.slug.indexOf('vnd') < 0 ? (
                          <div style={STYLE.gift.listItemName}>
                            {item.reward.linked_object.box_basic.name}
                            {' trị giá '}
                            {currenyFormat(item.reward.linked_object.box_basic.price)}
                          </div>
                        ) : (
                          <div style={STYLE.gift.listItemName}>{item.reward.linked_object.box_basic.name}</div>
                        )}
                      </div>
                    );
                  }
                  return null;
                })}
            </div>
          )}
        </div>
        <div
          style={{
            width: 0,
            height: 0,
            opacity: 0,
            visibility: 'hidden',
            overflow: 'hidden'
          }}
        />
      </div>
      <div style={Object.assign({}, STYLE.infoGame.container, isShowInfo && STYLE.infoGame.container.show)}>
        <div style={STYLE.infoGame.bgGradient} className={'gamegrd'} />
        <div style={STYLE.infoGame.content}>
          <div style={STYLE.infoGame.panel}>
            <div style={STYLE.infoGame.headerPanel} />
            <div style={STYLE.infoGame.infoContent}>
              <p style={STYLE.infoGame.title}>Thể lệ tham gia</p>
              <p style={STYLE.infoGame.text}>- Tất cả các tài khoản Lixibox đều có thể tham gia.</p>
              <p style={STYLE.infoGame.text}>
                - Bạn có một lượt lắc mỗi ngày. Lượt chơi mới sẽ xuất hiện vào lúc 12:00AM mỗi ngày.
              </p>
              <p style={STYLE.infoGame.text}>
                - Chọn nút Bấm & Lắc để bắt đầu lượt chơi của bạn, mỗi lượt lắc sẽ kéo dài trong 10 giây.
              </p>
              <p style={STYLE.infoGame.text}>
                - Khi bạn trúng giải, phần thưởng sẽ được hiện ra sau khi hoàn thành lượt chơi. Bạn có thể xem danh sách
                quà bạn nhận được từ Lixibox tại “Quà đã nhận”.
              </p>
              <p style={STYLE.infoGame.text}>
                - Các giải thưởng bằng Lixicoin hoặc tiền thưởng sẽ được cộng trực tiếp vào tài khoản của bạn, bạn có
                thể sử dụng cho đơn hàng tiếp theo.
              </p>
              <p style={STYLE.infoGame.text}>
                - Các giải thưởng là sản phẩm sẽ được tự động có trong giỏ hàng của bạn khi bạn mua hàng đơn hàng tiếp
                theo.
              </p>
              <p style={STYLE.infoGame.text}>- Quà tặng là sản phẩm không thể quy đổi thành tiền mặt.</p>
              <p style={STYLE.infoGame.text}>
                - Mọi tranh chấp phát sinh trong thời gian tham gia trò chơi, quyền quyết định cuối cùng thuộc về
                Lixibox.
              </p>
            </div>
            <div
              style={Object.assign({}, STYLE.info.play, STYLE.info.playBack)}
              onClick={() => handleShowHideInfo(false)}
            >
              Quay lại
            </div>
          </div>
        </div>
      </div>
      <div style={Object.assign({}, STYLE.infoGame.container, isShowRedeem && STYLE.infoGame.container.show)}>
        <div style={STYLE.infoGame.bgGradient} className={'gamegrd'} />
        <div style={STYLE.infoGame.content}>
          <div style={STYLE.infoGame.panel}>
            <div style={STYLE.infoGame.headerPanel} />
            <div style={STYLE.infoGame.infoContent}>
              <p style={STYLE.infoGame.title}>Nhận thêm lượt chơi</p>
              <p style={STYLE.infoGame.text}>
                - Thông thường bạn có một lượt lắc mỗi ngày. Lượt chơi mới sẽ xuất hiện vào lúc 12:00AM mỗi ngày.
              </p>
              <p style={STYLE.infoGame.text}>
                - Tuy nhiên bạn có thể đổi Lixicoin để lấy lượt chơi mới, với tỷ lệ
                {!!cartStore &&
                  !!cartStore.constants &&
                  !!cartStore.constants.games &&
                  ` ${cartStore.constants.games.redeem_coins} `}
                Lixicoin / lượt chơi. Bạn được chơi tối đa
                {!!cartStore &&
                  !!cartStore.constants &&
                  !!cartStore.constants.games &&
                  ` ${cartStore.constants.games.play_times_per_day_limit} `}
                lần trong 1 ngày.
              </p>
              {!!redeemResultMessage && !!redeemResultMessage.length ? (
                <div style={{ paddingTop: 50 }}>
                  <p style={STYLE.infoGame.title}>{redeemResultMessage}</p>
                </div>
              ) : (
                <div style={STYLE.coinRedeem}>
                  <div style={STYLE.coinRedeem.status}>
                    Số Lixicoin bạn có
                    <div style={STYLE.coinRedeem.count}>
                      {!!gameStore &&
                        !!gameStore.loadGame &&
                        !!gameStore.loadGame.profile &&
                        numberFormat(gameStore.loadGame.profile.user.coins * 1)}
                      {' Lixicoin'}
                    </div>
                  </div>

                  {!!gameStore &&
                    !!gameStore.loadGame &&
                    gameStore.loadGame.profile &&
                    (gameStore.isLoadingRedeemPlayTimes ? (
                      <Loading style={{ height: 100 }} />
                    ) : gameStore.loadGame.profile.available_redeem_times > 0 ? (
                      gameStore.loadGame.profile.user.coins > 100 ? (
                        <div onClick={() => handleRedeemPlayTimes()} style={STYLE.coinRedeem.redeemAction}>
                          Đổi ngay 1 lượt chơi
                        </div>
                      ) : (
                        <div style={STYLE.coinRedeem.noCoin}>Bạn không đủ Lixicoin</div>
                      )
                    ) : (
                      <div style={STYLE.coinRedeem.outOfTimes}>Bạn đã sử dụng hết lượt đổi của hôm nay</div>
                    ))}
                </div>
              )}
            </div>
            <div
              style={Object.assign({}, STYLE.info.play, STYLE.info.playBack)}
              onClick={() => handleShowHideRedeem(false)}
            >
              Quay lại
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default renderView;
