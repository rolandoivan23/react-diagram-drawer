import React from "react"
import PropTypes from "prop-types"
class HelloWorld extends React.Component {
  render () {
    return (
      <React.Fragment>
        Greattings: {this.props.greattings}
      </React.Fragment>
    );
  }
}

HelloWorld.propTypes = {
  greattings: PropTypes.string
};
export default HelloWorld
