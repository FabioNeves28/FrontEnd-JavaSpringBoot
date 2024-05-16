import React from 'react';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';

export default function ListaDeEstudantes({ estudante }) {
    return (
        <Container>
 
                <Paper elevation={10} style={{padding: 20, height: 'auto', width: "auto", margin: "20px auto", borderRadius: 10}}>
                    <h1>Lista de Estudantes</h1>
                    {estudante.map(estudante => (
                        <Paper elevation={15} style={{margin: "10px", padding: "15px", textAlign: "left", background: "#e5e5e5"}} key={estudante.id}>
                            Id: {estudante.id} <br/>
                            Nome: {estudante.nome}<br/>
                            Endereço: {estudante.endereco}<br/>
                        </Paper>
                    ))}
                </Paper>
 
        </Container>
    );
}
