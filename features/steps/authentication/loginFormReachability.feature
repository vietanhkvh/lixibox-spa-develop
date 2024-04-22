Feature: Login form reachability
  A guest should be able to reach login form

  @desktop
  Scenario: Guest can reach login page through top bar
    Given guest is on 'home' page
    When guest clicks on 'Đăng nhập / Đăng ký'
    Then guest is redirected to 'login' page

  @desktop
  Scenario: Guest can reach login popup through product like event
    Given guest is on 'halio' page
    When guest clicks 'like' button
    Then login popup becomes visible

  Scenario: Guest can reach login page through forgot password page
    Given guest is on 'forgot password' page
    When guest clicks on 'Đăng nhập'
    Then guest is redirected to 'login' page

  @mobile
  Scenario: Guest can reach login page through the bottom navigation
    Given guest is on 'home' page
    When guest clicks on 'Tài khoản'
    Then guest is redirected to 'login' page

  @mobile
  Scenario: Guest can view 'login/signup prompt' through product like event
    Given guest is on 'halio' page
    When guest clicks 'like' button
    Then login/signup prompt becomes visible

  @mobile
  Scenario: Guest can reach login page through 'login/signup prompt'
    Given login/signup prompt is visible
    When guest clicks on 'Đăng nhập'
    Then guest is redirected to 'login' page
