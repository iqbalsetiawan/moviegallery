import React, { Component } from "react";
import ErrorScreen from "./ErrorScreen";

export class Logger extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(err, info) {
    console.log("Error", err, "Info", info);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorScreen />;
    }
    return this.props.children;
  }
}

export default Logger;
