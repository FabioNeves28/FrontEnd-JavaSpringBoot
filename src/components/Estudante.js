import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

export default function Estudante() {
    const paperStyle = {padding: 20, height: '70vh', width: 370, margin: "20px auto", borderRadius: 10};
    const [nome, setNome] = React.useState('');
    const [cep, setCep] = React.useState('');
    const [endereco, setEndereco] = React.useState('');
    const [estudante, setEstudante] = React.useState([]);
    const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);
    const [showNoUsersAlert, setShowNoUsersAlert] = React.useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        const novoEstudante = {nome, endereco};
        console.log(novoEstudante); 
        fetch('http://localhost:8080/estudante/adicionar', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(novoEstudante)
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
        fetch('http://localhost:8080/estudante/listar')
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
                setEstudante(resultado);
            }
        })
        .catch(error => {
            console.error('Erro ao listar estudantes:', error);
        });
    }, []);

    const handleCepChange = (e) => {
        const cepValue = e.target.value;
        setCep(cepValue);

        if (cepValue.length === 8) {
            fetch(`https://viacep.com.br/ws/${cepValue}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    setEndereco(`${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`);
                } else {
                    console.error('CEP não encontrado');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar o CEP:', error);
            });
        }
    };

    return (
        <Container>
            {showSuccessAlert && (
                <div className="success-alert" style={{ opacity: 1, transition: 'opacity 0.5s ease-in-out' }}>
                    <Alert variant="filled" severity="success">
                        Estudante adicionado com sucesso!
                    </Alert>
                </div>
            )}
            {showNoUsersAlert && (
                <div className="error-alert" style={{ opacity: 1, transition: 'opacity 0.5s ease-in-out' }}>
                    <Alert variant="filled" severity="error">
                        Nenhum usuário cadastrado
                    </Alert>
                </div>
            )}
            <Paper elevation={10} style={paperStyle}> 
                <h1>Criar novo Estudante</h1>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 0.5, width: '35ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="nome" label="Nome do Estudante" variant="outlined" fullWidth
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                    <TextField id="cep" label="CEP" variant="outlined" fullWidth 
                        value={cep}
                        onChange={handleCepChange}
                    />
                    <TextField id="endereco" label="Endereço do Estudante" variant="outlined" fullWidth 
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleClick}>Enviar</Button>
                </Box>
            </Paper>
            <h1>Estudantes</h1>
            <Paper elevation={3} style={paperStyle}>
                {estudante.map(estudante => (
                    <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={estudante.id}>
                        Id: {estudante.id}<br/>
                        Nome: {estudante.nome}<br/>
                        CEP: {estudante.cep}<br/>
                        Endereço: {estudante.endereco}
                    </Paper>
                ))}
            </Paper>
        </Container>
    );
}
