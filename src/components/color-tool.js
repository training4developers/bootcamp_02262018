import * as React from 'react';

import { ToolHeader } from './tool-header';
import { ColorForm } from './color-form';
export class ColorTool extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      colors: props.colors.concat(),
    };
  }

  addColor = (colorName) => {

    this.setState({
      colors: this.state.colors.concat(colorName),
    });
  };

  render() {

    return <div>
      <ToolHeader headerText2={2} />
      <ul>
        {this.state.colors.map(color => <li key={color}>{color}</li>)}
      </ul>
      <ColorForm onSubmitColor={this.addColor} />
    </div>;
  }

}