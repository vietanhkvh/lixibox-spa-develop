
Feature: Signup
  A guest should be able to signup

  Scenario: Guest can signup from the signup page using enter key to submit the form
    Given guest is on 'signup' page
    When guest fills up the signup form
    And presses 'enter' key on 'password' field
    Then guest is redirected to 'home' page
    And UI reflects the logged in state

  @mobile
  Scenario: [Mobile] Guest can signup from the signup page using submit button to submit the form
    Given guest is on 'signup' page
    When guest fills up the signup form
    And guest double clicks the 'signup' button
    Then guest is redirected to 'home' page
    And UI reflects the logged in state

  @desktop
  Scenario: [Desktop] Guest can signup from the signup page using signup button to submit the form
    Given guest is on 'signup' page
    When guest fills up the signup form
    And guest clicks 'signup' button
    Then guest is redirected to 'home' page
    And UI reflects the logged in state
