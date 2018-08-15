import React, { Component } from 'react';
import './Base.css';

class Base extends Component {
    constructor(props) {
        super();
        this.state = { }
    }
    componentDidMount(){ }
    componentWillMount(){ }
    componentWillUnmount() { }
    componentWillReceiveProps(nextProps){ }
    componentWillUpdate(nextProps, nextState){ }
    componentDidUpdate(prevProps, prevState){ }
  render() {
      return (
          <div className="Base">
              This is the base component...
          </div>
      );
  }
}

export default Base;
