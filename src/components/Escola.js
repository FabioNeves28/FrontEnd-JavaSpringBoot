import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

export default function Escola() {
    const paperStyle = {padding: 20, height: '70vh', width: 370, margin: "20px auto", borderRadius: 10};
    const [nome_escola, setNomeEscola] = React.useState('');
    const [escola, setEscola] = React.useState([]);
    const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);
    const [showNoUsersAlert, setShowNoUsersAlert] = React.useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        const novaEscola = {nome_escola};
        console.log(novaEscola); 
        fetch('http://localhost:8080/escola/adicionar', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(novaEscola)
        })
        .then(() => {
            console.log('Novo estudante adicionado');
            setShowSuccessAlert(true);
            setTimeout(() => {
                setShowSuccessAlert(false);
            }, 2000);
        })
        .catch(error => {
            console.error('Erro ao adicionar novo estudante:', error);
        });
    }

    React.useEffect(() => {
        fetch('http://localhost:8080/escola/listar')
        .then(response => {
            if (!response.ok) {
                setShowNoUsersAlert(true);
                return [];
            }
            return response.json(); 
        })
        .then(resultado => {
            if (resultado.length === 0) {
                setShowNoUsersAlert(true); 
            } else {
                setEscola(resultado);
            }
        })
        .catch(error => {
            console.error('Erro ao listar estudantes:', error);
        });
    }, []);

    return (
        <Container>
            {showSuccessAlert && (
                <div className="success-alert" style={{ opacity: 1, transition: 'opacity 0.5s ease-in-out' }}>
                    <Alert variant="filled" severity="success">
                        Escola adicionada com sucesso!
                    </Alert>
                </div>
            )}
            {showNoUsersAlert && (
                <div className="error-alert" style={{ opacity: 1, transition: 'opacity 0.5s ease-in-out' }}>
                    <Alert variant="filled" severity="error">
                        Nenhuma escola encontrada
                    </Alert>
                </div>
            )}
            <Paper elevation={10} style={paperStyle}> 
                <h1>Criar nova escola</h1>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 0.5, width: '35ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="nome" label="Nome da Escola" variant="outlined" fullWidth
                        value={nome_escola}
                        onChange={(e) => setNomeEscola(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleClick}>Enviar</Button>
                </Box>
            </Paper>
            <h1>Estudantes</h1>
            <Paper elevation={3} style={paperStyle}>
                {escola.map(escola => (
                    <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={escola.id_escola}>
                        Id: {escola.id_escola}<br/>
                        Nome: {escola.nome_escola}<br/>
                    </Paper>
                ))}
            </Paper>
        </Container>
    );
}
