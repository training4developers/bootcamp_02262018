import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
import { createStore, bindActionCreators, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import thunk from 'redux-thunk';

const reducer = (state = { colors: [] }, action) => {

  console.dir(state);

  switch(action.type) {

    case 'REFRESH_REQUEST':
      return state;
    case 'REFRESH_DONE':
      return { ...state, colors: action.colors };
    case 'INSERT_REQUEST':
      return state;
    case 'INSERT_DONE':
      return state;
    default:
      return state;

  }

};

const appStore = createStore(reducer, applyMiddleware(thunk));

const createRefreshRequestAction = () => ({
  type: 'REFRESH_REQUEST',
});

const createRefreshDoneAction = colors => ({
  type: 'REFRESH_DONE',
  colors,
});

const refresh = () => {

  return dispatch => {

    dispatch(createRefreshRequestAction());

    return fetch('http://localhost:4000/colors')
      .then(res => res.json())
      .then(colors => dispatch(createRefreshDoneAction(colors)));

  };
};

const createInsertRequestAction = color => ({
  type: 'INSERT_REQUEST',
  color,
});

const createInsertDoneAction = color => ({
  type: 'INSERT_DONE',
  color,
});

const insert = color => {

  return dispatch => {

    dispatch(createInsertRequestAction(color))

    return fetch('http://localhost:4000/colors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(color)
    })
      .then(() => refresh()(dispatch));    

  };

}

const ColorTool = props => <div>
  <ul>{props.colors.map(c => <li key={c.id}>{c.name}</li>)}</ul>
  <button type="button" onClick={() => props.refresh()}>Refresh</button>
  <form>
    <div>Name:
      <input type="text" defaultValue=""
        ref={i => this.n = i} />
    </div>
    <div>HexCode:
      <input type="color" defaultValue="#000000"
        ref={i => this.h = i} />
    </div>
    <button type="button" onClick={
      () => props.insert({
        name: this.n.value, hexCode: this.h.value
      })}>Add Color</button>
  </form>
</div>;

const ColorToolContainer = connect(
  (state) => { console.log(state); return ({ colors: state.colors }); },
  dispatch => bindActionCreators({ refresh, insert }, dispatch)
)(ColorTool);


ReactDOM.render(<Provider store={appStore}>
  <ColorToolContainer />
</Provider>, document.querySelector('main'));

refresh()(appStore.dispatch);


// collection url
// fetch('http://localhost:4000/colors')
//   .then(res => res.json())
//   .then(colors => console.log(colors));

// fetch('http://localhost:4000/colors', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({
//     name: 'Hot Pink',
//     hexCode: '#FF69B4',
//   })
// })
//   .then(res => res.json())
//   .then(color => console.log(color));
