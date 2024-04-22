Feature: Signup form reachability
  A guest should be able to reach signup form

  @mobile
  Scenario: Guest can reach signup page through 'login/signup prompt'
    Given login/signup prompt is visible
    When guest clicks on 'Tạo tài khoản'
    Then guest is redirected to 'signup' page

  Scenario: Guest can reach signup page through login page
    Given guest is on 'login' page
    When guest clicks on 'Đăng ký'
    Then guest is redirected to 'signup' page

  @desktop
  Scenario: Guest can reach signup page through login popup
    Given login popup is visible
    When guest clicks on 'Đăng ký'
    Then guest is redirected to 'signup' page
