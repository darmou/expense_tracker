import App from './App';
import RouterApp from './ClientRouterApp';
import SimpleCommentScreen from '../components/SimpleCommentScreen/SimpleCommentScreen';
import routerExpensesStore from '../store/routerExpensesStore';
import expensesStore from '../store/expensesStore';
import NavigationBarApp from './NavigationBarApp';
import ReactOnRails from 'react-on-rails';

ReactOnRails.setOptions({
  traceTurbolinks: TRACE_TURBOLINKS, // eslint-disable-line no-undef
});

ReactOnRails.register({
  App,
  RouterApp,
  NavigationBarApp,
  SimpleCommentScreen,
});

ReactOnRails.registerStore({
  routerExpensesStore,
  expensesStore,
});
