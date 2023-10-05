import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoggedIn: false,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // Aquí deberías implementar la lógica de autenticación en el servidor
    // Compara las credenciales ingresadas con las almacenadas en tu base de datos

    const { username, password } = this.state;

    if (username === 'usuario' && password === 'contraseña') {
      this.setState({ isLoggedIn: true });
      alert('Inicio de sesión exitoso.');
    } else {
      alert('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  };

  render() {
    if (this.state.isLoggedIn) {
      return <div>¡Has iniciado sesión!</div>;
    } else {
      return (
        <div>
          <h1>Iniciar Sesión</h1>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="username">Nombre de Usuario:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              required
            />
            <br />
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
            <br />
            <button type="submit">Iniciar Sesión</button>
          </form>
        </div>
      );
    }
  }
}

export default Login;
