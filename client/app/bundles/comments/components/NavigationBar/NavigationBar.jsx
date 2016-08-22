import React, {PropTypes} from 'react';
import ReactOnRails from 'react-on-rails';
import classNames from 'classnames';
import ExpensesCount from './ExpensesCount';
import * as paths from '../../constants/paths';

const NavigationBar = (props) => {
  const { expensesCount, pathname } = props;

  return (
   <div></div>
  );
};

NavigationBar.propTypes = {
  commentsCount: PropTypes.number,
  pathname: PropTypes.string.isRequired,
};

export default NavigationBar;
