import { connection } from './connection.js';


export async function inserirSala(nome, usuarioId) {
     const comando = `
        INSERT INTO sala (nome, usuario_id)
        VALUES (?, ?)
    `;

    let [resposta] = await connection.query(comando, [nome, usuarioId]);
    return resposta.insertId; // retorna o ID da sala criada
}


export async function buscarSalaPorId(salaId) {
   const comando = `
        SELECT id, nome, usuario_id
        FROM sala
        WHERE id = ?
    `;

    let [linhas] = await connection.query(comando, [salaId]);
    return linhas.length > 0 ? linhas[0] : null; // retorna a sala ou null se não existir
}

