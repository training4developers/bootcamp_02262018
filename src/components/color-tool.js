import * as React from 'react';

export class ColorTool extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      colors: props.colors.concat(),
      colorName: '',
    };
  }

  onChange = (e) => {

    this.setState({
      [ e.target.name ]: e.target.type === 'number'
        ? Number(e.target.value)
        : e.target.value,
    });
  }

  addColor = () => {

    this.setState({
      colors: this.state.colors.concat(this.state.colorName),
      colorName: '',
    });
  };

  render() {

    return <div>
      <header>
        <h1>Color Tool</h1>
      </header>
      <ul>
        {this.state.colors.map(color => <li key={color}>{color}</li>)}
      </ul>
      <form>
        <div>
          <label htmlFor="name-input">Color Name:</label>
          <input id="name-input" type="text" name="colorName"
            value={this.state.colorName} onChange={this.onChange} />
        </div>

        <button type="button" onClick={this.addColor}>Add Color</button>
      </form>
    </div>;
  }

}