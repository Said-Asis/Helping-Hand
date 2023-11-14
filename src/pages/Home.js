import * as React from 'react';
import { useState, useEffect } from 'react';
import { Grid, Box, Typography, Container, Button, TextField} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from "../context/authContext";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import db from "../firebase";


const defaultTheme = createTheme();


export default function Home() {
    
    const {user, logout, loading} = useAuth()

    const handleLogout = async () => {
        try {
        await logout ()
    } catch (error) {
        console.error(error);
    }
    };

    

    

    return (
      <ThemeProvider theme={defaultTheme}>
            <Container component='main'>
                <Grid 
                    style={{
                        marginTop: '2%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}    
                >
                    <Grid style={{backgroundColor: 'lightblue', padding:"2%"}}>
                        <div
                            style={{
                                margin: '10%'
                            }}    
                        >
                            <Typography 
                            component='h1'
                            variant='h5'
                            >
                                Queonda {user.displayName || user.email} 
                            </Typography>
                        </div>
                        <Box
                            component="form"  
                            //onSubmit={handleSubmit}
                            style={{
                                margin: '10%'
                            }}    
                        >
                           <TextField
                                id="info"
                                label="Informacion"
                                type="info"
                                multiline
                                rows={4}
                                //onChange={handleSubmit}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                //onSubmit={handleSubmit}
                        >
                            Nueva Info
                        </Button>
                        </Box>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleLogout}
                        >
                            Salir de Sesion
                        </Button>
                    </Grid>
                </Grid>
            </Container>
      </ThemeProvider>
    );
  }