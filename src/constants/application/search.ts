export const SearchSource = Object.freeze({
  NONE: '' as const,
  ENTER: 'enter' as const, // search panel: enter
  SEARCH_ICON: 'search_icon' as const, // search panel: search icon
  AUTOCOMPLETE: 'autocomplete' as const,
  HISTORY: 'history' as const, // search panel: searched keywords
  TRENDING: 'trending' as const, // trending search section on the homepage
  TRENDING_KEYWORDS: 'trending_keywords' as const, // trending keywords section on the search panel
  SUGGESTION: 'suggestion' as const,
  TOP_BRANDS: 'top_brands' as const, // search panel: top brands
  TOP_CATEGORIES: 'top_categories' as const, // search panel: top categories
  SUGGESTED_KEYWORDS: 'suggested_keywords' as const, // search panel: suggested keywords
  SUGGESTED_MAGAZINE_KEYWORDS: 'suggested_magazine_keywords' as const, // search panel: suggested magazine keywords
  SUGGESTED_PRODUCTS: 'suggested_products' as const, // search panel: suggested products
  SUGGESTED_PRODUCTS_VIEW_ALL: 'suggested_products_view_all' as const, // search panel: suggested products view all
  PROMOTION_MESSAGE: 'promotion_message' as const, // search panel: promotion message
  PERSONALIZED_MESSAGE: 'personalized_message' as const // search panel: personalized message
});

export const SearchVersion = Object.freeze({
  V1: 'v1',
  V2: 'v2'
});
