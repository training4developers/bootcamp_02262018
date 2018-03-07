import * as React from 'react';
import * as ReactDOM from 'react-dom';

let counter = 0;

class ListItem extends React.Component {

  constructor(props) {
    super(props);
    this.counter = counter++;

    this.state = { item: props.item };
    console.log('constructor: ' + this.counter);
  }

  render() {
    console.log('render: ' + this.counter);
    return <li>props: {this.props.item}, state: { this.state.item}</li>;
  }
}

class UnorderedList extends React.Component {
  render() {
    return <ul>
      {this.props.items.map( (item, index) => <ListItem key={Math.random()} item={item} />)}
    </ul>;
  }
}

const items = [ 'koala', 'moose', 'dog', 'panda' ];

ReactDOM.render(
  <UnorderedList items={items} />,
  document.querySelector('main')
);

setTimeout(() => {

  items.splice(2, 1);

  ReactDOM.render(
    <UnorderedList items={items} />,
    document.querySelector('main')
  );
  

}, 5000);