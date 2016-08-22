import expensesReducer, { $$initialState as $$expensesState } from './expensesReducer';
import railsContextReducer, { initialState as railsContextState } from './railsContextReducer';

export default {
  $$expensesStore: expensesReducer,
  railsContext: railsContextReducer,
};

export const initialStates = {
  $$expensesState,
  railsContextState,
};
