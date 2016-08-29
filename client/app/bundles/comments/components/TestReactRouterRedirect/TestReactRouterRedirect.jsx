import React, { PropTypes } from 'react';

import BaseComponent from 'libs/components/BaseComponent';

export default class TestReactRouterRedirect extends BaseComponent {
    static propTypes = {
        location: PropTypes.object.isRequired
    };

  static checkAuth(nextState, replace) {
    //Let's check with devise to see if we are logged in and if not, hit the login page
    $.ajax({
      method: "GET",
      url: "/auth/is_signed_in.json"
    })
        .done(function(data){
          //our route debugger

          if(!data.signed_in && typeof(this.props) === "undefined" || ((!(typeof(this.props) === "undefined") && this.props.location.pathname !== "/"))) {
            if(!(typeof(this.context) === "undefined")) {
                this.context.router.push('/');
            }

          }
          // } else if (data.signed_in) {
          //   this.context.router.push('/react-router/'+ data.user.id);
          // }
        }.bind(this));

    // const notAuthorized = true;
    // if (notAuthorized) {
    //   replace({ pathname: '/', state: { redirectFrom: nextState.location.pathname } });
    // }
  }

  render() {
    return (
      <div>Nope.</div>
    );
  }

}
