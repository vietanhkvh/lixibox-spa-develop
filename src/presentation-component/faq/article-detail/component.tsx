import SanitizedAndPreprocessedHTMLContent from 'presentation-component/general/sanitized-and-preprocessed-html-content';

import styles from './style.module.scss';

interface FAQArticleDetailProps {
  title: string;
  content: string;
}
const FAQArticleDetail = ({ title, content }: FAQArticleDetailProps) => {
  return (
    <div className={styles.faqDetail}>
      <div>{title}</div>
      <SanitizedAndPreprocessedHTMLContent isDetectLink={false} content={content} isSantitizeHtml={false} />
    </div>
  );
};

export default FAQArticleDetail;
