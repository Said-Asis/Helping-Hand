import { useState } from 'react';
import sur from '../assets/images/sur.png';
import logo from '../assets/images/LogoNqn.png';
import { useForm } from 'react-hook-form';
import {
  IconButton,
  InputAdornment,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  Stack,
  Alert,
  Link,
  createTheme,
  ThemeProvider,
} from '@mui/material';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { useNavigate } from 'react-router-dom';
const defaultTheme = createTheme();

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        'https://desacumbre.neuquen.gov.ar/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: data.user,
            pass: data.pass,
          }),
        }
      );

      const responseData = await response.json();
      console.log(responseData);

      if (response.ok) {
        setError(false);
        localStorage.setItem('token', responseData.records[0].token);
        navigate('../');
      } else {
        setError(true);
      }
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: '8%',
            marginBottom: '7.5%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={logo} alt='sur' height={62} />
          <Typography component='h1' variant='h5'>
            Iniciar Secion
          </Typography>

          <Box
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <Link underline='always' href='./Register'>
              ¿No tienes un usuario? Registrate aquí.
            </Link>
            <TextField
              margin='normal'
              required
              fullWidth
              id='user'
              label='Usuario'
              name='user'
              autoComplete='usuario'
              autoFocus
              {...register('user', {
                required: 'Campo obligatorio.',
                pattern: {
                  value: /^[a-zA-Z0-9.]+$/,
                  message: 'No puede tener símbolos.',
                },
              })}
              error={!!errors.user}
              helperText={errors.user?.message}
            />

            <TextField
              margin='normal'
              required
              fullWidth
              name='pass'
              label='Contraseña'
              type={showPassword ? 'text' : 'password'}
              id='pass'
              autoComplete='current-password'
              {...register('pass', {
                required: 'Campo obligatorio.',
              })}
              error={!!errors.pass}
              helperText={errors.pass?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge='end'
                      aria-label='toggle password visibility'
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {error && (
              <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert
                  severity='error'
                  style={{ color: '#ffffff', backgroundColor: '#f44336' }}
                  iconMapping={{
                    error: <LockOutlinedIcon fontSize='inherit' />,
                  }}
                >
                  Credenciales inválidas.
                </Alert>
              </Stack>
            )}

            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              style={{ backgroundColor: '#ADD8E6' }}
            >
              Iniciar sesión
            </Button>
            <Link underline='always' href='./Register'>
              ¿Olvidaste tu contraseña?
            </Link>
          </Box>
          <box>
            <img src={sur} alt='sur' height={150} />
          </box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}