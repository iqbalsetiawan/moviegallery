import React from "react";
import PropTypes from "prop-types";

import Header from "./Header";

class BaseLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        <Header />
        {children}
      </div>
    );
  }
}

BaseLayout.propTypes = {
  children: PropTypes.any,
};

export default BaseLayout;
