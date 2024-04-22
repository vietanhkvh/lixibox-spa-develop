import STYLE from './style';

const renderView = ({ props, state, reShake }) => {
  const { countDown, isShaking } = state;
  return (
    <div style={STYLE.container}>
      <div style={STYLE.info}>
        <div className={'bgrgame'} style={STYLE.info.bgLight}></div>
        <div className={'gamegrd'} style={STYLE.info.bgGradient}></div>
        <div style={STYLE.info.content}>
          <div style={STYLE.info.contentInfo}>
            <div style={STYLE.info.contentInfoPanel}>
              <div
                style={Object.assign({}, STYLE.info.pig, STYLE.info.pig5, {
                  visibility: countDown < 14 && countDown > 10 ? 'visible' : 'hidden'
                })}
              ></div>
              <div
                style={Object.assign({}, STYLE.info.slogan, {
                  visibility: countDown < 14 && countDown > 10 ? 'visible' : 'hidden'
                })}
              ></div>

              <div
                className={'pig1'}
                style={Object.assign({}, STYLE.info.pig, STYLE.info.pig1, {
                  visibility: countDown <= 10 && countDown > 0 && isShaking ? 'visible' : 'hidden'
                })}
              ></div>
              <div
                className={'pig2'}
                style={Object.assign({}, STYLE.info.pig, STYLE.info.pig2, {
                  visibility: countDown <= 10 && countDown > 0 && isShaking ? 'visible' : 'hidden'
                })}
              ></div>
              <div
                className={'pig3'}
                style={Object.assign({}, STYLE.info.pig, STYLE.info.pig3, {
                  visibility: countDown <= 10 && countDown > 0 && isShaking ? 'visible' : 'hidden'
                })}
              ></div>
              <div
                className={'play'}
                style={Object.assign({}, STYLE.info.slogan, {
                  visibility: countDown <= 10 && countDown > 0 && isShaking ? 'visible' : 'hidden'
                })}
              ></div>

              <div
                style={Object.assign({}, STYLE.info.pig, STYLE.info.pig5, {
                  visibility: countDown <= 10 && countDown > 0 && !isShaking ? 'visible' : 'hidden'
                })}
              ></div>
              <div
                className={'play'}
                style={Object.assign({}, STYLE.info.slogan, {
                  visibility: countDown <= 10 && countDown > 0 ? 'visible' : 'hidden'
                })}
              ></div>

              <div
                className={'pig'}
                style={Object.assign({}, STYLE.info.pig, STYLE.info.pig4, {
                  visibility: countDown === 14 || countDown <= 0 ? 'visible' : 'hidden'
                })}
              ></div>

              <div
                className={''}
                style={Object.assign({}, STYLE.info.emptySlogan, {
                  visibility: countDown === 14 ? 'visible' : 'hidden'
                })}
              ></div>
              <div
                onClick={() => reShake()}
                className={'play'}
                style={Object.assign({}, STYLE.info.playAgain, { visibility: countDown === 14 ? 'visible' : 'hidden' })}
              >
                Lắc lại nhé
              </div>
            </div>
          </div>
        </div>
        <div style={STYLE.info.bgFlora}>
          {countDown <= 10 && countDown > 0 && <div style={STYLE.info.countdown}>{countDown}</div>}
        </div>
        <div
          style={{
            width: 0,
            height: 0,
            opacity: 0,
            visibility: 'hidden',
            overflow: 'hidden'
          }}
        ></div>

        <div
          className={countDown <= 10 && countDown > 0 && isShaking ? 'diamond-shake1' : ''}
          style={Object.assign({}, STYLE.info.diamond, STYLE.info.diamond1)}
        ></div>
        <div
          className={countDown <= 10 && countDown > 0 && isShaking ? 'diamond-shake2' : ''}
          style={Object.assign({}, STYLE.info.diamond, STYLE.info.diamond2)}
        ></div>
        <div
          className={countDown <= 10 && countDown > 0 && isShaking ? 'diamond-shake3' : ''}
          style={Object.assign({}, STYLE.info.diamond, STYLE.info.diamond3)}
        ></div>
        <div
          className={countDown <= 10 && countDown > 0 && isShaking ? 'diamond-shake4' : ''}
          style={Object.assign({}, STYLE.info.diamond, STYLE.info.diamond4)}
        ></div>
        <div
          className={countDown <= 10 && countDown > 0 && isShaking ? 'diamond-shake5' : ''}
          style={Object.assign({}, STYLE.info.diamond, STYLE.info.diamond5)}
        ></div>

        {countDown < 14 && countDown > 10 && <div style={STYLE.info.playOverlay}>{countDown - 10}</div>}
        {countDown < 14 && countDown > 10 && (
          <div className={'play'} style={STYLE.info.play}>
            {countDown - 10}
          </div>
        )}
      </div>
    </div>
  );
};

export default renderView;
