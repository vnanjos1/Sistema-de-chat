import { connection } from './connection.js';


export async function inserirPermissao(salaId, usuarioId, aprovado) {
    
    const comando = `
        INSERT INTO salaPermissao (sala_id, usuario_id, aprovado)
        VALUES (?, ?, ?)
    `;
     
    
    let [resposta] = await connection.query(comando, [salaId, usuarioId, aprovado]);
    return resposta.insertId; // retorna o id da nova permissão
}


export async function aprovarPermissao(salaId, usuarioId) {
     const comando = `
        UPDATE salaPermissao
        SET aprovado = 1
        WHERE sala_id = ? AND usuario_id = ?
    `;

    let [resposta] = await connection.query(comando, [salaId, usuarioId]);
    return resposta.affectedRows; // retorna quantas linhas foram alteradas
}


export async function verificarPermissaoSala(salaId, usuarioId) {
        const comando = `
        SELECT aprovado
        FROM salaPermissao
        WHERE sala_id = ? AND usuario_id = ?
    `;

    let [linhas] = await connection.query(comando, [salaId, usuarioId]);
    return linhas.length > 0 ? linhas[0].aprovado : null; 
    // true/false se encontrado, ou null se não existir
}