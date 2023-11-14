import * as React from 'react';
import { Button, CssBaseline, TextField, Grid, Box, Typography, Container, Link }  from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react";
import {useAuth} from "../context/authContext";
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function Login() {

    const [user, setUser] = useState({
        email: '',
        password:'',
    });

    const {login, loginWithGoogle, loginWithGithub} = useAuth ()
    const navigate = useNavigate()
    const [error, setError] = useState();

    const handleChange = ({target: {name, value}}) =>
        setUser({...user, [name]: value})

    const handleSubmit = async e =>{
        e.preventDefault()
        setError ('')
        try {
            await login(user.email, user.password)
            navigate('/')
        } catch (error) {
            console.log(error.code)
            switch (error.code) {
                case 'auth/invalid-email':
                    setError('Correo Incorrecto')
                    break
                case 'auth/weak-password':
                    setError('Contraseña Incorrecta')
                break;
                case 'auth/invalid-login-credentials':
                    setError("Usuario Inexistente")
                break;
                default:
                    setError('Introduzca un email y contraseña')
            }
        }
    }

    const handleGoogleSignin = async () =>{
      try {
        await loginWithGoogle()
        navigate('/')
    } catch {
        setError(error.message)
    }
    }

    const handleGithubSignin = async () =>{
      try {
        await loginWithGithub()
        navigate('/')
    } catch {
        setError(error.message)
    }
    }
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Iniciar Sesion
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              onChange={handleChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-contraseña"
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar Sesion
            </Button>

            <Link href="/register" variant="body2">
                  {"¿No tienes usuario? ¡Registrate Aqui!"}
                </Link>

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleGoogleSignin}
            >
              Goomgle
            </Button>

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleGithubSignin}
            >
              Github
            </Button>

            <Box sx={{
                    backgroundColor: "red",
                    color: "white"
                }}>
            {error && <p>{error}</p>}
            </Box>

            <Grid container>
              <Grid item xs>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}