import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as ReactDOM from 'react-dom';
import { createStore, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const reducer = (state = { result: 0, log: [] }, action) => {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        result: state.result + action.value,
        log: state.log.concat({ op: '+', val: action.value }),
      };
    case 'SUBTRACT':
      return state - action.value;
    case 'MULTIPLY':
      return state * action.value;
    case 'DIVIDE':
      return state / action.value;
    default:
      return state;
  }
};

// const createStore = (reducer) => {

//   let currentState = undefined;
//   const subscriptions = [];

//   return {
//     getState: () => currentState,
//     dispatch: action => {
//       currentState = reducer(currentState, action);
//       subscriptions.forEach(fn => fn());
//     },
//     subscribe: fn => subscriptions.push(fn),
//   };

// };

const store = createStore(reducer);

store.subscribe(() => {
  console.log(store.getState());
});

const createAddAction = value => ({ type: 'ADD', value });
const createSubtractAction = value => ({ type: 'SUBTRACT', value });
const createMultiplyAction = value => ({ type: 'MULTIPLY', value });
const createDivideAction = value => ({ type: 'DIVIDE', value });

// const bindActionCreators = (actions, dispatch) => {

//   const actionFns = {};
//   Object.keys(actions).forEach(action => {
//     actionFns[action] = value => dispatch(actions[action](value));
//   });
//   return actionFns;
// };

// const connect = (mapStateToPropsFn, mapDispatchToPropsFn) => {

//   return (PresentationalComponent) => {

//     return class ContainerComponent extends React.Component {

//       static propTypes = {
//         store: PropTypes.shape({
//           dispatch: PropTypes.func.isRequired,
//           getState: PropTypes.func.isRequired,
//           subscribe: PropTypes.func.isRequired,
//         }),
//       };

//       constructor(props) {
//         super(props);
//         this.dispatchProps = mapDispatchToPropsFn(props.store.dispatch);
//       }

//       componentDidMount() {
//         this.unsubscribe = this.props.store.subscribe(() => {
//           this.forceUpdate();
//         });
//       }

//       componentWillUnmount() {
//         if (this.unsubscribe) this.unsubscribe();
//       }

//       render() {
//         const stateProps = mapStateToPropsFn(this.props.store.getState());
//         return <PresentationalComponent {...this.dispatchProps} {...stateProps} />;
//       }
//     }
//   };

// };

class CalculatorTool extends React.Component {

  static propTypes = {
    result: PropTypes.number.isRequired,
    add: PropTypes.func.isRequired,
    subtract: PropTypes.func.isRequired,
    multiply: PropTypes.func.isRequired,
    divide: PropTypes.func.isRequired,
  };

  static defaultProps = {
    result: 0,
  };

  componentDidMount() {
    if (this.numInput) {
      this.numInput.focus();
    }
  }

  render() {

    return <form>
      <div>Result: {this.props.result}</div>
      <div>
        <label>Input:</label>
        <input type="number" defaultValue={0} ref={input => this.numInput = input} />
      </div>
      <button type="button"
        onClick={() => this.props.add(Number(this.numInput.value))}>+</button>
      <button type="button"
        onClick={() => this.props.subtract(Number(this.numInput.value))}>-</button>
      <button type="button"
        onClick={() => this.props.multiply(Number(this.numInput.value))}>*</button>
      <button type="button"
        onClick={() => this.props.divide(Number(this.numInput.value))}>/</button>
    </form>;


  }

}

const mapStateToProps = state => {
  return { result: state };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    add: createAddAction,
    subtract: createSubtractAction,
    multiply: createMultiplyAction,
    divide: createDivideAction,
  }, dispatch);
};

const createContainer = connect(mapStateToProps, mapDispatchToProps);

const CalculatorToolContainer = createContainer(CalculatorTool);

ReactDOM.render(<CalculatorToolContainer store={store} />, document.querySelector('main'));

