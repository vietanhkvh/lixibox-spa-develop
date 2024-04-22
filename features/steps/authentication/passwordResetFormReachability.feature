Feature: Password reset form reachability
  A guest should be able to reach password reset form

  Scenario: Guest can reach reset password form through login page
    Given guest is on 'login' page
    When guest clicks on 'Quên mật khẩu?'
    Then guest is redirected to 'forgot password' page

  @desktop
  Scenario: Guest can reach signup page through login popup
    Given login popup is visible
    When guest clicks on 'Quên mật khẩu?'
    Then guest is redirected to 'forgot password' page
