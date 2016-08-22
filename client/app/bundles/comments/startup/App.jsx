import React from 'react';
import { Provider } from 'react-redux';
import NonRouterExpensesContainer from '../containers/NonRouterExpensesContainer';

export default (_props, _railsContext) => {
  const store = ReactOnRails.getStore('expensesStore');

    debugger;

  return (
    <Provider store={store}>
      <NonRouterExpensesContainer />
    </Provider>
  );
};
