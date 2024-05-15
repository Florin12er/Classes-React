import { Component } from "react";
import PropTypes from "prop-types";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
    this.increment = () => this.setState({ counter: this.state.counter + 1 });
    this.decrement = () => this.setState({ counter: this.state.counter - 1 });
  }
  static getDerivedStateFromProps(props, state) {}
  componentWillUnmount() {
    console.log("hello");
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.ignoreProp &&
      this.props.ignoreProp !== nextProps.ignoreProp
    ) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <>
        <div>
          <div className="counter">Counter: {this.state.counter}</div>
          <button
            onClick={() => {
              this.increment();
            }}
          >
            Add
          </button>
          <button
            onClick={() => {
              this.decrement();
            }}
          >
            Decrement
          </button>
        </div>
      </>
    );
  }
}
Counter.propTypes = {
  ignoreProp: PropTypes.number,
};
class Mount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mount: true,
      ignoreProp: 0,
    };
    this.mountCounter = () => this.setState({ mount: true });
    this.unmountCounter = () => this.setState({ mount: false });
    this.ignoreProp = () => this.setState({ ignoreProp: Math.random() });
  }
  render() {
    return (
      <>
        <button
          className="mount"
          onClick={this.mountCounter}
          disabled={this.state.mount}
        >
          Mount
        </button>
        <button
          className="unmount"
          onClick={this.unmountCounter}
          disabled={!this.state.mount}
        >
          Unmount
        </button>
        <button onClick={this.ignoreProp}>ignoreProp</button>
        {this.state.mount ? (
          <Counter ignoreProp={this.state.ignoreProp} />
        ) : null}
      </>
    );
  }
}
export {Mount, Counter}
