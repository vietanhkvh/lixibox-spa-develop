import { generatePath, Route } from 'react-router-dom';
import { reduxRender } from 'utils/test-utils';
import { ROUTING_AUTH_VERIFY_PHONE } from 'routings/path';
import SignupWithRegisteredPhoneNumber from '..';

const component = (params = {}) => {
  const props = {};

  return (
    <Route
      path={ROUTING_AUTH_VERIFY_PHONE}
      component={() => <SignupWithRegisteredPhoneNumber {...Object.assign({}, props, params)} />}
    />
  );
};

describe('SignupWithRegisteredPhoneNumber', () => {
  test(`renders`, () => {
    const route = generatePath(ROUTING_AUTH_VERIFY_PHONE, { phone: '0341112222' });

    expect(() => {
      reduxRender(component(), { route });
    }).not.toThrow();
  });
});
