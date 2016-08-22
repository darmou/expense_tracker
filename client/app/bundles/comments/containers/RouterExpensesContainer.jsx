import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Link} from 'react-router';

import CommentScreen from '../components/CommentScreen/CommentScreen';
import * as commentsActionCreators from '../actions/commentsActionCreators';
import BaseComponent from 'libs/components/BaseComponent';

function select(state) {
  // Which part of the Redux global state does our component want to receive as props?
  return { data: state.$$expensesStore };
}

class RouterCommentsContainer extends BaseComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    location: PropTypes.shape({
      state: PropTypes.object,
    }).isRequired,
  };

  static contextTypes = {
    router: React.PropTypes.object
  }

  constructor(props) {
    super(props);
    //context.router
    this.state = {
      email: "",
      password: ""
    };

    // Bind callback methods to make `this` the correct context.
    this.onSubmit = this.onSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }


  handleEmailChange (e) {
    //this.setState({email: e.target.value});
    //debugger;
    this.setState({email: e.target.value});
  }


  handlePasswordChange (e)  {
    this.setState({password: e.target.value});
  }


  onSubmit(e) {
    e.preventDefault();
    // this.context.router.transitionTo('/expenses');
    this.context.router.push('/react-router');
  }

  render() {
    const { dispatch, data } = this.props;
    const actions = bindActionCreators(commentsActionCreators, dispatch);
    const locationState = this.props.location.state;

    return (
        <section>
        <h1>Please Login</h1>
            <form onSubmit={this.onSubmit} className="form-signin">

              <label htmlFor="inputEmail" className="sr-only">Email address</label>
              <input type="email" id="inputEmail" className="form-control" onChange={this.handleEmailChange} placeholder="Email address" required autoFocus/>
              <label htmlFor="inputPassword" className="sr-only">Password</label>
              <input type="password" id="inputPassword" className="form-control"  onChange={this.handlePasswordChange} placeholder="Password" required/>
              <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            </form>
          </section>

    );
  }
}

// Don't forget to actually use connect!
export default connect(select)(RouterCommentsContainer);
