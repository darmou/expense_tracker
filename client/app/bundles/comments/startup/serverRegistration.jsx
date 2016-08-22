// Example of React + Redux
import App from './App';
import RouterApp from './ServerRouterApp';
import SimpleCommentScreen from '../components/SimpleCommentScreen/SimpleCommentScreen';
import ReactOnRails from 'react-on-rails';
import NavigationBarApp from './NavigationBarApp';
import routerExpensesStore from '../store/routerExpensesStore';
import expensesStore from '../store/expensesStore';

ReactOnRails.register(
  {
    App,
    RouterApp,
    NavigationBarApp,
    SimpleCommentScreen,
  }
);

ReactOnRails.registerStore({
    routerExpensesStore,
    expensesStore,
});
