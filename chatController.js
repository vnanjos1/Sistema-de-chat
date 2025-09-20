import { Router } from 'express';
import { getAuthentication } from '../utils/jwt.js';

import * as salaPermissaoRepo from '../repository/salaPermissaoRepository.js';
import * as chatRepo from '../repository/chatRepository.js';

const endpoints = Router();
const autenticador = getAuthentication();


endpoints.post('/chat/:sala', autenticador, async (req, resp) => {
        try {
        let sala = req.params.sala;
        let mensagem = req.body;
        let id = await chatRepo.inserirMensagem(sala, mensagem);
        resp.send({ novoId: id });
    } catch (err) {
        resp.status(500).send({ erro: err.message });
    }
});



endpoints.get('/chat/:sala', autenticador, async (req, resp) => {
     try {
        let sala = req.params.sala;
        let mensagens = await chatRepo.listarMensagens(sala);
        resp.send(mensagens);
    } catch (err) {
        resp.status(500).send({ erro: err.message });
    }
});


export default endpoints;