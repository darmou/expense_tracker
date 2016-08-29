import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Link} from 'react-router';

import CommentScreen from '../components/CommentScreen/CommentScreen';
import * as commentsActionCreators from '../actions/commentsActionCreators';
import BaseComponent from 'libs/components/BaseComponent';
import Functions from '../utils/functions';

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

    this.ALERT_TYPE = {
      ERROR : 0,
      ALERT: 1
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


  displayAndRemoveAlert(alert_message, alert_type) {
    var message_id = '#alert_message';
    var block_id = '#expense-alert';

    if(alert_type == this.ALERT_TYPE.ERROR) {
      message_id = '#alert_error_message';
      block_id = '#expense-error';
    }

    $(message_id).html(alert_message);
    $(block_id).attr("style","display:block;");
    window.setTimeout(function() {
      $(block_id).fadeTo(500, 0).slideUp(500, function(){
        $(block_id).attr("style","display:none;");
      });
    }, 5000);
}


  onSubmit(e) {
    e.preventDefault();

    //We actually want to use an ajax call to login in aget the user id
    //Once we have that we can actually log in
    // this.context.router.transitionTo('/expenses');

    $.ajax({
      method: "POST",
      url: "/users/sign_in.json",
      data: {
        user: {
          email: this.state.email,
          password: this.state.password
        },
        authenticity_token: Functions.getMetaContent("csrf-token")
      }
    })
        .done(function(data){
          this.context.router.push('/react-router/' + data.id);
          //location.reload();
        }.bind(this)).fail(function(data) {
              this.displayAndRemoveAlert(JSON.parse(data.responseText).error, this.ALERT_TYPE.ERROR);
        }.bind(this));

  }

  render() {
    const { dispatch, data } = this.props;
    const actions = bindActionCreators(commentsActionCreators, dispatch);
    const locationState = this.props.location.state;

    return (
        <section>

          <div className="col-xs-12" id="expense-error" style={{"display":"none"}}>
            <div className="alert alert-danger fade in" style={{"marginTop":"18px"}}>
              <a href="#" className="close" data-dismiss="alert" aria-label="close" title="close">x</a>
              <span id="alert_error_message"></span>
            </div>
          </div>
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
