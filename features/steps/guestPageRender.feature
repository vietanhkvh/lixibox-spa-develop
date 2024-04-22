# TODO: Fix the commented out routes

Feature: Guest Session Render
  On a guest session, page renders on a given browser without any error

  Scenario Outline: Page renders without error
    Given guest is browsing "<page>"
    Then public session renders the page without error

    Examples:
      | page                                                             |
      | /category                                                        |
      | /categoory/new-skin-care                                         |
      | /lingerie                                                        |
      | /shop                                                            |
      | /shop/clean-it-zero                                              |
      # Auth pages
      | /sign-in                                                         |
      | /forgot-password                                                 |
      | /sign-up                                                         |
      | /users/password/edit                                             |
      | /connect-facebook                                                |
      # Mobile tab pages
      | /mobile-feed                                                     |
      | /mobile-promotion                                                |
      # User group
      | /user                                                            |
      | /user/orders/1                                                   |
      | /user/orders/99999999                                            |
      | /user/feedbacks                                                  |
      | /user/wishlist                                                   |
      | /user/watched                                                    |
      | /user/waitlist                                                   |
      | /user/profile                                                    |
      | /user/change-password                                            |
      | /user/profile-edit                                               |
      | /user/delivery                                                   |
      | /user/notification                                               |
      | /user/subscription                                               |
      | /user/lixicoin                                                   |
      | /user/invite                                                     |
      | /user/member                                                     |
      # Magazine
      | /magazine                                                        |
      | /magazine/category                                               |
      | /magazine/category/5                                             |
      | /magazine/category/99999999                                      |
      | /magazine/5                                                      |
      | /magazine/99999999                                               |
      | /magazine/tag                                                    |
      | /magazine/tag/5                                                  |
      | /magazine/tag/99999999                                           |
      | /magazine/video                                                  |
      | /magazine/video/1                                                |
      | /magazine/video/99999999                                         |
      # Check out
      | /check-out                                                       |
      | /check-out/cart                                                  |
      | /check-out/payment                                               |
      | /check-out/success                                               |
      # Instant buy
      | /buynow                                                          |
      | /sensitive/buynow                                                |
      | /sensitive-mint/buynow                                           |
      # Lixicoin
      | /lixicoin                                                        |
      | /lixicoin/faq                                                    |
      # Theme
      | /theme                                                           |
      | /shop/theme                                                      |
      | /theme/theme-slug                                                |
      | /shop/theme/theme-slug                                           |
      # Brand
      | /brands                                                          |
      | /brands/halio                                                    |
      # Info
      | /info                                                            |
      | /info/about-us                                                   |
      | /info/term                                                       |
      | /info/privacy                                                    |
      | /privacy                                                         |
      | /info/careers                                                    |
      | /info/give-gift-card                                             |
      | /info/buy-on-app                                                 |
      | /info/buy-on-web                                                 |
      | /info/shipping-fee                                               |
      | /info/receive-and-return                                         |
      | /info/guarantee                                                  |
      | /info/content                                                    |
      | /info/give-gift-card-time                                        |
      | /info/use-card-time                                              |
      | /info/question-about-us                                          |
      | /info/question-receive-gift                                      |
      | /info/question-invite-friends-get-rewards                        |
      | /info/gift-card-2019                                             |
      | /info/makeover                                                   |
      | /info/mask-bar                                                   |
      | /info/skin-test                                                  |
      | /info/recommend                                                  |
      # Search
      | /search                                                          |
      | /search/halio                                                    |
      # Special deals
      | /special-deals                                                   |
      | /special-deals/weekly-specials                                   |
      | /special-deals/non-existent                                      |
      # Orders
      | /orders                                                          |
      | /orders/trackings                                                |
      | /orders/trackings/5                                              |
      | /orders/trackings/99999999                                       |
      # Loves
      | /love                                                            |
      | /loves                                                           |
      | /loves/new                                                       |
      # Referral
      | /invite                                                          |
      | /invite/nonexistent                                              |
      # Expert
      | /ex                                                              |
      | /ex/reviews                                                      |
      | /ex/reviews/5                                                    |
      | /ex/reviews/99999999                                             |
      # Redeem
      | /redeem                                                          |
      | /redeem/hot                                                      |
      | /redeem/recommendation                                           |
      | /redeem/latest                                                   |
      # Sale
      | /sale                                                            |
      # Mobile brand
      | /mobile-brand                                                    |
      # Community
      | /community                                                       |
      | /community/5                                                     |
      | /community/99999999                                              |
      | /community/tag                                                   |
      | /community/tag/halio                                             |
      | /community/tag/non-existent                                      |
      | /community/unboxing                                              |
      | /community/unboxing/guide-line                                   |
      | /community/question-answer/                                      |
      | /community/user                                                  |
      | /community/user/non-existent                                     |
      | /community/best-deals                                            |
      | /community/feedback                                              |
      | /community/feedback/create                                       |
      | /community/feedback/edit                                         |
      | /community/feedback/edit/5                                       |
      | /community/feedback/edit/99999999                                |
      | /community/top-hash-tag                                          |
      | /community/top-hot-boxes                                         |
      | /community/top-good-sale                                         |
      | /community/top-review                                            |
      | /community/top-liked                                             |
      # Reviews
      | /feedbacks/5                                                     |
      | /feedbacks/99999999                                              |
      # Pay
      | /pay                                                             |
      | /pay/5                                                           |
      # Deep link
      | /mobile                                                          |
      # Hot links
      | /halio                                                           |
      | /halio-sensitive                                                 |
      | /halio/sensitive                                                 |
      | /sensitive                                                       |
      | /sensitive-mint                                                  |
      | /halio/sensitive/baby-pink                                       |
      | /halio/sensitive/mint                                            |
      | /halio/hot-pink                                                  |
      # | /halio/non-existent                                              |
      | /lustre                                                          |
      | /shop/eyeshadow-base-professional-line                           |
      | /shop/lustre-pro-flawless-matte-foundation-spf-22-pa-beige-ivory |
      | /lustre/non-existent                                             |
      | /okame                                                           |
      # Reorder
      | /re-order                                                        |
      | /re-order/5                                                      |
      | /re-order/99999999                                               |
      # # Game
      # | /games                                                           |
      # | /games/beauty-hunter                                             |
      # | /games/beauty-hunter/play                                        |
      # | /games/beauty-hunter/result                                      |
      # Discount code
      | /discount-code                                                   |
      | /discount-code/MINIBALM                                          |
      | /discount-code/NONEXISTENT                                       |
      # Support
      | /support-center                                                  |
      # Store
      | /store                                                           |
      | /404                                                             |
