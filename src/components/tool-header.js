import * as React from 'react';

export class ToolHeader extends React.Component {

  render() {
    return <header>
      <h1>{this.props.headerText}</h1>
    </header>;
  }

}