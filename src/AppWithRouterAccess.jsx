import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Security, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';

import Home from './Pages/Home';

const AppWithRouterAccess = () => {
  const issuer = process.env.REACT_APP_OKTA_URL_BASE + '/oauth2/' +
    process.env.REACT_APP_OKTA_AUTHORIZATION_SERVER_ID;
  const clientId = process.env.REACT_APP_OKTA_CLIENTID;
  const redirect = process.env.REACT_APP_OKTA_APP_BASE_URL + '/callback';

  const oktaAuth = new OktaAuth({
    issuer: issuer,
    clientId: clientId,
    redirectUri: redirect,
  });

  const history = useHistory();

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Route path='/' exact={true} component={Home}/>
      <Route path='/callback' component={LoginCallback}/>
    </Security>
  );
};

export default AppWithRouterAccess;
