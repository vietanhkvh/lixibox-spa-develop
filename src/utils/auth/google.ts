export const onGoogleSignin = () => {
  window.location.href = `https://accounts.google.com/o/oauth2/auth?redirect_uri=${process.env.REACT_APP_GOOGLE_SIGNIN_REDIRECT_URI}&response_type=code token id_token&scope=openid profile email&client_id=${process.env.REACT_APP_GOOGLE_SIGNIN_CLIENT_ID}`;
};
