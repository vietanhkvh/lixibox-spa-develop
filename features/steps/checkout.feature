Feature: Checkout flow
  A user should be able to checkout

  Scenario: Guest may land on homepage, choose a product, then login and checkout
    Given guest is on home page
    And added a product to cart
    And navigated to cart page
    And attempted to procceed to payment page
    And logged in successfully and redirected to payment page
    When user continues
    Then user should see order placement confirmation
