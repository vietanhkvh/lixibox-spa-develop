const primaryTestUserCredentials = {
  email: 'primarytestuser@gmail.com',
  password: '12345678'
};

function generateNewUserCredentials() {
  const formatedTimestamp = new Date().getTime();
  return {
    name: 'Test User',
    email: `testUser${formatedTimestamp}@example.com`,
    password: `12345678`
  };
}

exports.generateNewUserCredentials = generateNewUserCredentials;
exports.primaryTestUserCredentials = primaryTestUserCredentials;
