import React, { PropTypes } from 'react';
import { Navigation } from 'react-router'
//import { browserHistory } from './react-router'
import BaseComponent from 'libs/components/BaseComponent';
import './Layout.scss';

export default class Layout extends BaseComponent {

  static propTypes = {
    children: PropTypes.object.isRequired,
  };

  static contextTypes = {
    router: React.PropTypes.object
  }

  componentWillMount() {
    $.ajax({
      method: "GET",
      url: "/auth/is_signed_in.json"
    })
        .done(function(data){
         // debugger;
          this.setState({ signedIn: data.signed_in });
          if(!data.signed_in && this.props.location.pathname !== "/") {
            this.context.router.push('/');
          } else if (data.signed_in) {
            this.context.router.push('/react-router/'+ data.user.id);
          }
        }.bind(this));
  }

  constructor(props) {
    super(props);
    this.state = {
      signedIn: false
    };
  }

  render() {
    return (
      <section>
        {this.props.children }
      </section>
    );
  }
}
