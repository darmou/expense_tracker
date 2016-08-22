import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NavigationBar from '../components/NavigationBar/NavigationBar';
import * as commentsActionCreators from '../actions/commentsActionCreators';
import BaseComponent from 'libs/components/BaseComponent';

function stateToProps(state) {
  // Which part of the Redux global state does our component want to receive as props?
  if (state.$$expensesStore) {
    return {
      expensesCount: state.$$expensesStore.get('$$expenses').size,
      pathname: state.railsContext.pathname,
    };
  } else {
    return { };
  }
}

class NavigationBarContainer extends BaseComponent {
  static propTypes = {
    expensesCount: PropTypes.number.isRequired,
    pathname: PropTypes.string.isRequired,
  };

  render() {
    const { expensesCount, pathname } = this.props;

    return (
      <NavigationBar {...{ expensesCount, pathname }} />
    );
  }
}

// Don't forget to actually use connect!
export default connect(stateToProps)(NavigationBarContainer);
