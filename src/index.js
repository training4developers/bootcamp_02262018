import * as React from 'react';
import * as ReactDOM from 'react-dom';

const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'ADD':
      return state + action.value;
    case 'SUBTRACT':
      return state - action.value;
    default:
      return state;
  }
};

const createStore = (reducer) => {

  let currentState = undefined;
  const subscriptions = [];

  return {
    getState: () => currentState,
    dispatch: action => {
      currentState = reducer(currentState, action);
      subscriptions.forEach(fn => fn());
    },
    subscribe: fn => subscriptions.push(fn),
  };

};

const store = createStore(reducer);

store.subscribe(() => {
  console.log(store.getState());
});

const createAddAction = value => ({ type: 'ADD', value });
const createSubtractAction = value => ({ type: 'SUBTRACT', value });

// const add = value => store.dispatch(createAddAction(value));
// const subtract = value => store.dispatch(createSubtractAction(value));

const bindActionCreators = (actions, dispatch) => {

  const actionFns = {};
  Object.keys(actions).forEach(action => {
    actionFns[action] = value => dispatch(actions[action](value));
  });
  return actionFns;
};


const { add, subtract } = bindActionCreators({
  add: createAddAction,
  subtract: createSubtractAction,
}, store.dispatch);

add(1);
subtract(2);
add(3);
subtract(4);
add(5);

class MyComp extends React.Component {

  constructor(props) {
    super(props);

    console.log('MyComp constructor called');
  }

  render() {
    console.log('MyComp render');
    return <h1>{this.props.state} rocks!</h1>;
  }
}

ReactDOM.render(<div>
  <MyComp state="California" />
  <MyComp state="Oregon" />
</div>, document.querySelector('main'));

setTimeout(() => {
  ReactDOM.render(<div>
    <MyComp state="Virginia" />
    <MyComp state="Pennsylvania" />
  </div>, document.querySelector('main'));
}, 3000);