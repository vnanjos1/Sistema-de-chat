import { connection } from './connection.js';


export async function inserirMensagem(usuarioId, salaId, mensagem) {
      const comando = `
        INSERT INTO chat (usuario_id, sala_id, mensagem, criacao)
        VALUES (?, ?, ?, NOW())
    `;

    let [resposta] = await connection.query(comando, [usuarioId, salaId, mensagem]);
    return resposta.insertId; // retorna o ID da mensagem criada
}


export async function listarMensagensPorSala(salaId) {
    const comando = `
        SELECT c.id,
               u.nome AS usuario,
               c.mensagem,
               c.criacao
        FROM chat c
        INNER JOIN usuario u ON c.usuario_id = u.id
        WHERE c.sala_id = ?
        ORDER BY c.criacao ASC
    `;

    let [linhas] = await connection.query(comando, [salaId]);
    return linhas; // retorna todas as mensagens da sala
}