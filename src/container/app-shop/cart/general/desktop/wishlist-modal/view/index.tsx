import classNames from 'classnames';

import style from './style.module.scss';

const List = ({ productList, template: Template }) => {
  return (
    <div className={classNames(style.body)}>
      {Array.isArray(productList) &&
        productList.map((product, index) => {
          return (
            <div key={index} className={classNames(style.productContainer)}>
              <Template {...product} />
            </div>
          );
        })}
    </div>
  );
};

const renderView = ({ productList, template }) => {
  return 0 === productList.length ? null : (
    <div className={classNames(style.productSlideContainer, style.slider)}>
      <List {...{ productList, template }} />
    </div>
  );
};

export default renderView;
