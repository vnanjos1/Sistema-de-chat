import { Router } from 'express';
import { getAuthentication } from '../utils/jwt.js';

import * as salaPermissaoRepo from '../repository/salaPermissaoRepository.js';
import * as salaRepo from '../repository/salaRepository.js';

const endpoints = Router();
const autenticador = getAuthentication();



endpoints.post('/sala/:sala/entrar', autenticador, async (req, resp) => {
 try {
        let novoLogin = req.body; 
        let sala = req.params.sala;
        let usuario = novoLogin.usuarioId;

        let id = await salaPermissaoRepo.inserirPermissao(sala, usuario, false);
        resp.send({ novoId: id });
    } catch (err) {
        resp.status(500).send({ erro: err.message });
    }
});

  

endpoints.post('/sala/:sala/aprovar/:usuario', autenticador, async (req, resp) => {
     try {
        let sala = req.params.sala;
        let usuario = req.params.usuario;
        let id = await salaPermissaoRepo.aprovarUsuario(sala, usuario);
        resp.send({ aprovadoId: id });
    } catch (err) {
        resp.status(500).send({ erro: err.message });
    }
  
});



export default endpoints;
