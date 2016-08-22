import React, { PropTypes } from 'react';
import { Navigation } from 'react-router'
//import { browserHistory } from './react-router'
import BaseComponent from 'libs/components/BaseComponent';
import './Layout.scss';

export default class Layout extends BaseComponent {

  static propTypes = {
    children: PropTypes.object.isRequired,
  };
  

  render() {

    return (
      <section>
        {this.props.children }
      </section>
    );
  }
}
