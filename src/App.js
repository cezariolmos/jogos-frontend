import React, { useState, useEffect } from 'react';
import api from './api';
import Header from './header';
import { 
    Container, 
    Table, 
    TableRow, 
    TableHead,
    TableBody,
    TableCell,  
    Dialog, 
    Button, 
    DialogTitle, 
    DialogContent,
    DialogContentText, 
    TextField,
    DialogActions } from '@material-ui/core';
import './style.css';

// Jogos (id, nome, ano)
function App() {

    const [ lista, setLista ] = useState([]);
    const [ open, setOpen ] = useState(false);
    const [ nome, setNome] = useState('');
    const [ ano, setAno] = useState('');

    function loadData() {
        api.get('/jogos').then((response) => {
            const itens = response.data;
            setLista(itens);
        })
    }

    useEffect(() => loadData(), []);

    const openModal = () => setOpen(true);

    const closeModal = () => setOpen(false);

    //Função para adicionar um novo jogo
    function addJogos() { 
        const name = nome;
        const year = ano;
        api.post('/jogos', { nome: name, ano: year}).then((response) => {
        setNome('');
        setAno('');
        setOpen(false);
        loadData()
        })
     }


    //Função para excluir um jogo da lista.
     function deleteJogos(id) {
         api.delete(`/jogos/${id}`).then((response) => {
            loadData()
         })
     }


    return (
        <>
        <Header />
        <Container maxWidth="lg" className="container">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nome do Jogo</TableCell>
                        <TableCell>Ano</TableCell>
                        <TableCell>Apagar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {lista.map(item => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.nome}</TableCell>
                            <TableCell>{item.ano}</TableCell>
                            <TableCell>
                                <Button variant="outlined" size="small" color="secondary" onClick={() => deleteJogos(item.id)} >Apagar</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button 
                onClick={openModal}
                variant="contained" 
                color="primary" 
                style={{marginTop: '20px'}}>
                Adicionar
            </Button>
            </Container>
            <Dialog open={open} onClose={closeModal} fullWidth={true} maxWidth="sm">
                <DialogTitle id="form-dialog-title">Novo Jogo</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Digite o jogo que gostaria adicionar.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="nome"
                        label="Jogo"
                        type="text"
                        fullWidth
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="ano"
                        label="Ano"
                        type="number"
                        fullWidth
                        value={ano}
                        onChange={e => setAno(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={addJogos} color="primary">
                        Salvar
                    </Button>
                 </DialogActions>
            </Dialog>
        </>
    );

}

export default App;
