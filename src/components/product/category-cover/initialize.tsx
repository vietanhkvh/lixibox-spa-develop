import { CDN_ASSETS_PREFIX } from '../../../utils/uri';

const lingerie = CDN_ASSETS_PREFIX('/category-cover/lingerie.png');
const bras = CDN_ASSETS_PREFIX('/category-cover/bras.png');
const panties = CDN_ASSETS_PREFIX('/category-cover/panties.png');
const momBaby = CDN_ASSETS_PREFIX('/category-cover/new-mom-baby.png');

export const DEFAULT_PROPS = {
  categorySlug: ''
};

export const INITIAL_STATE = {
  slugConfig: {
    underwear: lingerie,
    lingerie,
    bras,
    panties,
    'mum-baby': momBaby,
    mum: momBaby,
    baby: momBaby,
    'mom-and-baby': momBaby,
    mom: momBaby,
    'mom-baby': momBaby
  }
};
