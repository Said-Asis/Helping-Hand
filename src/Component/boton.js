import React from 'react';

class HelpingHand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <p>Contenido de la caja de texto: {this.state.value}</p>
      </div>
    );
  }
}

export default HelpingHand;
