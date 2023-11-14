import * as React from 'react';
import { useState, useEffect } from 'react';
import { Grid, Box, Typography, Container, Button, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from "../context/authContext";
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
import db from "../firebase";

const defaultTheme = createTheme();

export default function Home() {
    const { user, logout } = useAuth();
    const [infoText, setInfoText] = useState('');
    const [infoList, setInfoList] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (editingId) {
            try {
                await updateDoc(doc(db, "info", editingId), {
                    text: infoText,
                });
                console.log("Document successfully updated!");
            } catch (e) {
                console.error("Error updating document: ", e);
            }

            setInfoText('');
            setEditingId(null);
        } else {
            try {
                await addDoc(collection(db, "info"), {
                    text: infoText,
                });
                console.log("Document successfully added!");
            } catch (e) {
                console.error("Error adding document: ", e);
            }

            setInfoText('');
        }
    };

    const handleEdit = (id, text) => {
        setEditingId(id);
        setInfoText(text);
    };

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "info", id));
            console.log("Document successfully deleted!");
        } catch (e) {
            console.error("Error deleting document: ", e);
        }
    };

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "info"), (querySnapshot) => {
            const dataList = [];
            querySnapshot.forEach((doc) => {
                dataList.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setInfoList(dataList);
        });

        return () => {
            // Detener la escucha cuando el componente se desmonta
            unsubscribe();
        };
    }, []); // No olvides pasar un array vacío como segundo argumento para que se ejecute solo una vez

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
                    <Grid style={{backgroundColor: 'lightblue', padding:"3%", width: '70%'}}>
                        <div style={{ margin: '10%' }}>    
                            <Typography component='h1' variant='h5'>
                                Queonda {user.displayName || user.email} 
                            </Typography>
                        </div>
                        <Box component="form" onSubmit={handleSubmit} style={{ margin: '10%' }}> 
                            <TextField
                                id="info"
                                label="Informacion"
                                type="info"
                                multiline
                                rows={4}
                                value={infoText}
                                onChange={(e) => setInfoText(e.target.value)}
                                style={{ width: '90%' }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {editingId ? 'Actualizar Info' : 'Nueva Info'}
                            </Button>
                        </Box>

                        <ul>
                            {infoList.map((info) => (
                                <li key={info.id} style={{ 
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center' }}
                                                >
                                    <Typography style={{
                                                    marginBottom: "3%"
                                                }}
                                                >{info.text}</Typography>
                                    <div>
                                        <Button
                                            variant="contained"
                                            onClick={() => handleEdit(info.id, info.text)}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={() => handleDelete(info.id)}
                                            style={{ marginLeft: '8px', }}
                                        >
                                            Eliminar
                                        </Button>
                                    </div>
                                </li>
                            ))}
                        </ul>

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
