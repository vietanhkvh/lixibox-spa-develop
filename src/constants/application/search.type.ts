import { SearchSource, SearchVersion } from './search';

export type SearchSourceType = (typeof SearchSource)[keyof typeof SearchSource];
export type SearchVersionType = (typeof SearchVersion)[keyof typeof SearchVersion];
