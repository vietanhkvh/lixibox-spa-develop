import { MetaHTMLAttributes } from 'react';

/** Delcate IntrinsicElements */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      charset: MetaHTMLAttributes<HTMLMetaElement>;
      itemProp: string;
      itemScope: string;
      itemType: string;
      itemRef: string;
    }
  }
}
