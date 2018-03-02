import * as React from 'react';

export class ColorTool extends React.Component {

  render() {

    return <div>
      <header>
        <h1>Color Tool</h1>
      </header>
      <ul>
        {this.props.colors.map(color => <li key={color}>{color}</li>)}
      </ul>
    </div>;
  }

}