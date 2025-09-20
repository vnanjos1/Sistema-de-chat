import { Router } from 'express';
import { getAuthentication } from '../utils/jwt.js';

import * as salaRepo from '../repository/salaRepository.js';
import * as salaPermissaoRepo from '../repository/salaPermissaoRepository.js';

const endpoints = Router();
const autenticador = getAuthentication();


endpoints.post('/sala', autenticador, async (req, resp) => {
     try {
        let novaSala = req.body;
        let id = await salaRepo.criarSala(novaSala);
        resp.send({ novoId: id });
    } catch (err) {
        resp.status(500).send({ erro: err.message });
    }
});


export default endpoints;