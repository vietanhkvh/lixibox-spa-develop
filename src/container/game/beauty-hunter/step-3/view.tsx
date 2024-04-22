import Image from 'presentation-component/ui/image';
import { CDN_ASSETS_PREFIX } from '../../../../utils/uri';
import { CustomCurrencyType, formatCurrency } from '../../../../utils/currency';
import STYLE from './style';

const renderView = ({ props, state, handleBack }) => {
  const {
    gameStore: { playGame }
  } = props;
  return (
    <div style={STYLE.container}>
      <div style={STYLE.info}>
        <div className={'bgrgame'} style={STYLE.info.bgLight} />
        <div className={'gamegrd'} style={STYLE.info.bgGradient} />
        <div style={STYLE.info.content}>
          <div style={STYLE.info.contentInfo}>
            <div style={STYLE.info.contentInfoPanel}>
              <div style={STYLE.info.slogan} />
              {!!playGame &&
                !!playGame.reward &&
                !!playGame.reward.reward_type &&
                ('coin' === playGame.reward.reward_type || 'balance' === playGame.reward.reward_type) && (
                  <div style={STYLE.info.reward}>
                    <Image
                      src={CDN_ASSETS_PREFIX(
                        `/game/beauty-hunter-assets/${playGame.reward.reward_type}-${playGame.reward.value}.png`
                      )}
                      alt=""
                      style={STYLE.info.rewardAvatar}
                    />
                    <div style={STYLE.info.rewardName}>
                      Chúc mừng bạn đã nhận được{' '}
                      {formatCurrency(
                        playGame.reward.value,
                        'coin' === playGame.reward.reward_type
                          ? { suffix: CustomCurrencyType.LIXICOIN }
                          : 'balance' === playGame.reward.reward_type
                          ? { suffix: true }
                          : undefined
                      )}
                    </div>
                  </div>
                )}
              {!!playGame &&
                !!playGame.reward &&
                !!playGame.reward.reward_type &&
                'gift' === playGame.reward.reward_type && (
                  <div style={STYLE.info.reward}>
                    <Image
                      src={playGame.reward.linked_object.box_basic.primary_picture.medium_url}
                      alt=""
                      style={STYLE.info.rewardAvatar}
                    />
                    {playGame.reward.linked_object.box_basic.slug.indexOf('vnd') < 0 ? (
                      <div style={STYLE.info.rewardName}>
                        {playGame.reward.linked_object.box_basic.name} {' trị giá '}{' '}
                        {formatCurrency(playGame.reward.linked_object.box_basic.price, { suffix: true })}
                      </div>
                    ) : (
                      <div style={STYLE.info.rewardName}>{playGame.reward.linked_object.box_basic.name}</div>
                    )}
                  </div>
                )}
              <div style={STYLE.info.social}></div>
              <div className={'play'} style={STYLE.info.play} onClick={() => handleBack()}>
                Quà đã nhận
              </div>
            </div>
          </div>
        </div>
        <div style={STYLE.info.bgFlora} />
        <div className={'diamond'} style={Object.assign({}, STYLE.info.diamond, STYLE.info.diamond1)} />
        <div className={'diamond'} style={Object.assign({}, STYLE.info.diamond, STYLE.info.diamond2)} />
        <div className={'diamond'} style={Object.assign({}, STYLE.info.diamond, STYLE.info.diamond3)} />
        <div className={'diamond'} style={Object.assign({}, STYLE.info.diamond, STYLE.info.diamond4)} />
        <div className={'diamond'} style={Object.assign({}, STYLE.info.diamond, STYLE.info.diamond5)} />
        <div
          style={{
            width: 0,
            height: 0,
            opacity: 0,
            visibility: 'hidden',
            overflow: 'hidden'
          }}
        ></div>
      </div>
    </div>
  );
};

export default renderView;
