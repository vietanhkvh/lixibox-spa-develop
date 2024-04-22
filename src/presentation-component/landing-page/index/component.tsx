import Section from '../section';

import styles from './style.module.scss';

function SectionItem(item, index) {
  return <Section {...item} key={`section-landing-page-item-${index}`} extraData={{ rating: this.rating }} />;
}

const LandingPage = ({ data, rating = [] }) => {
  if (!data || !data.length) return null;

  return <div className={styles.container}>{data.map(SectionItem, { rating })}</div>;
};

export default LandingPage;
