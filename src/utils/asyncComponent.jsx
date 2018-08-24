import React, { Component } from "react";

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);
     //组件为空
      this.state = {
        component: null
      };
    }

    async componentDidMount() {
    //得到component Class
      const { default: component } = await importComponent();
      this.setState({component});
    }

    render() {
      const C = this.state.component;
    //   console.log("prop--->",<C {...this.props} /> )
      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}