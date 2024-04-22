import { StringSchema as StringSchemaBase } from 'yup';

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.svg' {
  const SVGRComponent: React.StatelessComponent<React.SVGAttributes<SVGElement>>;
  export default SVGRComponent;
}

// TODO: Import `Message` from `yup`
declare module 'yup' {
  interface StringSchema {
    minWords(minWords: number, message?: Message): StringSchemaBase;
    maxWords(maxWords: number, message?: Message): StringSchemaBase;
    integer(message?: any): StringSchemaBase;
    phoneOrEmail(message?: any): StringSchemaBase;
    fullNameSegments(param?: (param?: { path: string }) => string): StringSchemaBase;
    fullNameSegmentMin(param?: (param?: { path: string }) => string): StringSchemaBase;
  }
}
