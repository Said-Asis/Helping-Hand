import * as React from 'react';
import { Grid, Box, Typography, Container, Radio } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();


export default function Home() {
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
        email: data.get('email'),
        password: data.get('password'),
      });
    };
  
    return (
      <ThemeProvider theme={defaultTheme}>
            <Container component='main'>
                <Grid
                    style={{
                        marginTop: '2%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'blue'
                    }}    
                >
                    <Grid
                        
                        >
                        <Box
                            style={{
                                backgroundcolor: 'lightblue',
                            }}    
                        >
                            <Typography 
                            component='h1'
                            variant='h5'
                            >
                                Traducir 
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
      </ThemeProvider>
    );
  }