import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from '../layout/Layout';
import TestReactRouter from '../components/TestReactRouter/TestReactRouter';
import TestReactRouterRedirect from '../components/TestReactRouterRedirect/TestReactRouterRedirect';
import SimpleCommentScreen from '../components/SimpleCommentScreen/SimpleCommentScreen';
import RouterExpensesContainer from '../containers/RouterExpensesContainer';

export default (
  <Route path="/" component={Layout}>
    <IndexRoute
      component={RouterExpensesContainer}
    />
    <Route
      path="react-router/:id"
      component={TestReactRouter}
    />
    <Route
      path="react-router/redirect"
      component={TestReactRouterRedirect}
      onEnter={TestReactRouterRedirect.checkAuth}
    />
      <Route
          path="expenses"
          component={SimpleCommentScreen}
      />

  </Route>
);
