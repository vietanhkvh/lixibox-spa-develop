/* istanbul ignore next */
import { useState } from 'react';

const Section15 = () => {
  const [isShowVideo, setDisplayVideo] = useState(0);

  return (
    <div id="SECTION1029" className="ladi-section">
      <div className="ladi-section-background"></div>
      <div className="ladi-container">
        <div id="VIDEO1030" className="ladi-element">
          <div className="ladi-video">
            <div className="ladi-video-background"></div>
            <div id="SHAPE1030" className="ladi-element" onClick={() => setDisplayVideo(1)}>
              <div className="ladi-shape">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  preserveAspectRatio="none"
                  viewBox="0 0 408.7 408.7"
                  fill="rgba(238, 110, 102, 1)"
                >
                  <polygon fill="#fff" points="163.5 296.3 286.1 204.3 163.5 112.4 163.5 296.3"></polygon>
                  <path
                    d="M204.3,0C91.5,0,0,91.5,0,204.3S91.5,408.7,204.3,408.7s204.3-91.5,204.3-204.3S316.7,0,204.3,0ZM163.5,296.3V112.4l122.6,91.9Z"
                    transform="translate(0 0)"
                  ></path>
                </svg>
              </div>
            </div>
            {1 === isShowVideo && (
              <iframe
                id="VIDEO1030_player"
                className="iframe-video-preload"
                data-video-type="youtube"
                style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard- write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={true}
                title="YouTube video player"
                width="640"
                height="360"
                src="https://www.youtube.com/embed/NTFhEz9PjvY?rel=0&amp;modestbranding=0&amp;playsinline=0&amp;controls=1&amp;enablejsapi=1&amp;origin=https%3A%2F%2Fwww.ratchitiet.com&amp;widgetid=2"
              ></iframe>
            )}
          </div>
        </div>
        <div id="HEADLINE1035" className="ladi-element">
          <h3 className="ladi-headline">Ưu điểm vượt trội của Máy rửa mặt dành cho da nhạy cảm Halio Sensitive</h3>
        </div>
        <div id="VIDEO1173" className="ladi-element">
          <div className="ladi-video">
            <div className="ladi-video-background"></div>
            <div id="SHAPE1173" className="ladi-element" onClick={() => setDisplayVideo(2)}>
              <div className="ladi-shape">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  preserveAspectRatio="none"
                  viewBox="0 0 408.7 408.7"
                  fill="rgba(238, 110, 102, 1)"
                >
                  <polygon fill="#fff" points="163.5 296.3 286.1 204.3 163.5 112.4 163.5 296.3"></polygon>
                  <path
                    d="M204.3,0C91.5,0,0,91.5,0,204.3S91.5,408.7,204.3,408.7s204.3-91.5,204.3-204.3S316.7,0,204.3,0ZM163.5,296.3V112.4l122.6,91.9Z"
                    transform="translate(0 0)"
                  ></path>
                </svg>
              </div>
            </div>
            {2 === isShowVideo && (
              <iframe
                id="VIDEO1173_player"
                className="iframe-video-preload"
                data-video-type="youtube"
                style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={true}
                title="YouTube video player"
                width="640"
                height="360"
                src="https://www.youtube.com/embed/LatL_c287c8?rel=0&amp;modestbranding=0&amp;playsinline=0&amp;controls=1&amp;enablejsapi=1&amp;origin=https%3A%2F%2Fwww.ratchitiet.com&amp;widgetid=3"
              ></iframe>
            )}
          </div>
        </div>
        <div id="HEADLINE1231" className="ladi-element">
          <h3 className="ladi-headline">
            Hot girl Mai Hà Trang review trải nghiệm sử dụng Máy rửa mặt Halio Sensitive&nbsp;
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Section15;
