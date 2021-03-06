import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'libs/middlewares/loggerMiddleware';
import reducers, { initialStates } from '../reducers';
import { routerReducer } from 'react-router-redux';

export default (props, railsContext) => {
  const initialExpenses = props.expenses;
  const { $$expensesState } = initialStates;
  const initialState = {
    $$expensesStore: $$expensesState.merge({
      $$expenses: initialExpenses,
    }),
    railsContext,
  };

  // https://github.com/reactjs/react-router-redux
  const reducer = combineReducers({
    ...reducers,
    routing: routerReducer,
  });

  // Sync dispatched route actions to the history
  const finalCreateStore = compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  )(createStore);

  return finalCreateStore(reducer, initialState);
};
