import * as React from 'react';

export class ColorForm extends React.Component {

  static defaultProps = {
    buttonText: 'Submit Color',
  };

  constructor(props) {
    super(props);

    this.state = {
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

  submitColor = () => {

    this.props.onSubmitColor(this.state.colorName);

    this.setState({
      colorName: '',
    });

  }

  render() {

    return <form>
      <div>
        <label htmlFor="name-input">Color Name:</label>
        <input id="name-input" type="text" name="colorName"
          value={this.state.colorName} onChange={this.onChange} />
      </div>

      <button type="button" onClick={this.submitColor}>{this.props.buttonText}</button>
    </form>;

  }
}