import { Faq, Scheme, Testimonial, VideoBannerResponse } from 'types/api/gwp';

export interface GwpSchemes {
  index: Array<Scheme>;
  testimonials: Array<Testimonial>;
  faqs: Array<Faq>;
  videoBanner: {
    landscape: VideoBannerResponse;
    portrait: VideoBannerResponse;
  } | null;
  fetching: boolean;
  loaded: boolean;
  errored: boolean;
}

export interface GwpLoadedScheme {
  detail: Scheme;
  fetching: boolean;
  loaded: boolean;
  errored: boolean;
}

export interface GwpState {
  schemes: GwpSchemes;
  loadedScheme: GwpLoadedScheme;
}
