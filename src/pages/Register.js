import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react";
import {useAuth} from "../context/authContext"
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function Register() {

    const [user, setUser] = useState({
        email: '',
        password:'',
    });

    const {signup} = useAuth ()
    const navigate = useNavigate()
    const [error, setError] = useState();

    const handleChange = ({target: {name, value}}) =>
        setUser({...user, [name]: value})

    const handleSubmit = async e =>{
        e.preventDefault()
        setError ('')
        try {
            await signup(user.email, user.password)
            navigate('/')
        } catch (error) {
            console.log(error.code)
            switch (error.code) {
                case 'auth/invalid-email':
                    setError('Correo Invalido')
                    break
                case 'auth/weak-password':
                    setError('Contraseña Invalida')
                break;
                default:
                    setError('Introduzca un email y contraseña')
            }
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
            Crear Usuario
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="contraseña2"
              label="Confirmar Contraseña"
              type="contraseña2"
              id="contraseña2"
              autoComplete="current-contraseña"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrarse
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