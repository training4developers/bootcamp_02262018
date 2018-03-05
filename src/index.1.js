import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ColorTool } from './components/color-tool';
class App extends React.Component {

  render() {

    return <div>
      <h1>Tool Applications</h1>
      <ColorTool colors={this.props.colors} />
    </div>;
  }
}

const colorList = [ 'blue', 'black', 'white' ];

ReactDOM.render(
  <App colors={colorList} />,
  document.querySelector('main'),
);