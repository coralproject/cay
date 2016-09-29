import {createUserManager} from 'redux-oidc';

const userManagerConfig = {
  client_id: 'openidconnectcert',
  redirect_uri: `${window.location.protocol}//${window.location.host}/callback`,
  response_type: 'id_token',
  scope: 'openid',
  authority: 'https://92ca94b7.ngrok.io/connect',
  post_logout_redirect_uri: `${window.location.protocol}//${window.location.host}/login`,
  // silent_redirect_uri: `${window.location.protocol}//${window.location.host}/silent_renew.html`,
  automaticSilentRenew: true,
  loadUserInfo: false
};

export default createUserManager(userManagerConfig);
