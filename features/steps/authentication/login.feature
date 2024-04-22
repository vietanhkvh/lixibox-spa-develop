
Feature: Login
  A guest should be able to login

  Scenario: Guest can login from the login page using enter key to submit the form
    Given guest is on 'login' page
    When guest fills up the login form
    And presses 'enter' key on 'password' field
    Then guest is redirected to 'home' page
    And UI reflects the logged in state

  @mobile
  Scenario: [Mobile] Guest can login from the login page using submit button to submit the form
    Given guest is on 'login' page
    When guest fills up the login form
    And guest double clicks the 'login' button
    Then guest is redirected to 'home' page
    And UI reflects the logged in state

  @desktop
  Scenario: [Desktop] Guest can login from the login page using submit button to submit the form
    Given guest is on 'login' page
    When guest fills up the login form
    And guest clicks 'login' button
    Then guest is redirected to 'home' page
    And UI reflects the logged in state

  @desktop
  Scenario: Guest can login from the login popup using enter key to submit the form
    Given login popup is visible
    When guest fills up the login form
    And presses 'enter' key on 'password' field
    Then UI reflects the logged in state

  @desktop
  Scenario: Guest can login from the login popup using submit button to submit the form
    Given login popup is visible
    When guest fills up the login form
    And guest clicks 'login' button
    And UI reflects the logged in state
