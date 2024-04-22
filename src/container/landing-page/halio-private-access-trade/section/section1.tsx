/* istanbul ignore next */
import { isMobileVersion } from '../../../../utils/responsive';

const Section1 = () => {
  const handleScrollTo = (target) => {
    const element = document.getElementById(target);
    element && element.scrollIntoView();
  };

  return (
    <div id="SECTION1350" className="ladi-section" data-top="0" data-left="0" data-sticky="true">
      <div className="ladi-section-background"></div>
      <div className="ladi-container">
        {!isMobileVersion() && (
          <>
            <div
              data-action="true"
              id="HEADLINE1352"
              className="ladi-element"
              onClick={() => handleScrollTo('scroll-section-1')}
            >
              <h3 className="ladi-headline">Khuyến Mãi</h3>
            </div>
            <div
              data-action="true"
              id="HEADLINE1353"
              className="ladi-element"
              onClick={() => handleScrollTo('scroll-section-2')}
            >
              <h3 className="ladi-headline">Máy rửa mặt Halio</h3>
            </div>
            <div
              data-action="true"
              id="HEADLINE1354"
              className="ladi-element"
              onClick={() => handleScrollTo('scroll-section-3')}
            >
              <h3 className="ladi-headline">Halio Sensitive</h3>
            </div>
            <div
              data-action="true"
              id="HEADLINE1355"
              className="ladi-element"
              onClick={() => handleScrollTo('scroll-section-4')}
            >
              <h3 className="ladi-headline">Halio Ion Hot &amp; Cool</h3>
            </div>
          </>
        )}
        <div id="IMAGE1351" className="ladi-element">
          <div className="ladi-image">
            <div className="ladi-image-background"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1;
