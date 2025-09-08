const { query } = require("../banco de dados/conexao");

const listarTermos = async (req, res) => {
  try {
    const termos = await query("SELECT * FROM glossario");

    if (!termos.rows || termos.rows.length === 0) {
      return res.status(404).json({ mensagem: "Não há termos cadastrados" });
    }

    return res.status(200).json(termos.rows);
  } catch (error) {
    return res.status(500).json({ mensagem: `Erro Interno: ${error.message}` });
  }
};

const adicionarTermo = async (req, res) => {
  const { termo, sigla, significado, curso } = req.body;

  if (!termo || !significado) {
    return res.status(400).json({ mensagem: "Campo(s) obrigatório(s)" });
  }

  try {
    const queryCadastro = `
      INSERT INTO glossario (termo, sigla, significado, curso) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *`;

    const { rowCount, rows } = await query(queryCadastro, [
      termo,
      sigla,
      significado,
      curso,
    ]);

    if (rowCount <= 0) {
      return res.status(500).json({ mensagem: "Erro Interno ao cadastrar" });
    }

    return res.status(201).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: `Erro Interno: ${error.message}` });
  }
};

const editarTermo = async (req, res) => {
  const { termo, sigla, significado, curso } = req.body;
  const { id } = req.params;

  if (!termo || !significado) {
    return res.status(400).json({ mensagem: "Campo(s) obrigatório(s)" });
  }

  try {
    const termoExistente = await query(
      "SELECT * FROM glossario WHERE id = $1",
      [id]
    );

    if (termoExistente.rowCount <= 0) {
      return res.status(404).json({ mensagem: "O termo não existe" });
    }

    const queryEdicao = `
      UPDATE glossario 
      SET termo = $1, sigla = $2, significado = $3, curso = $4 
      WHERE id = $5 
      RETURNING *`;

    const { rowCount, rows } = await query(queryEdicao, [
      termo,
      sigla,
      significado,
      curso,
      id,
    ]);

    if (rowCount <= 0) {
      return res.status(500).json({ mensagem: "Erro Interno ao editar" });
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: `Erro Interno: ${error.message}` });
  }
};

const excluirTermo = async (req, res) => {
  const { id } = req.params;

  try {
    const termoExistente = await query(
      "SELECT * FROM glossario WHERE id = $1",
      [id]
    );

    if (termoExistente.rowCount <= 0) {
      return res.status(404).json({ mensagem: "O termo não existe" });
    }

    const { rowCount, rows } = await query(
      "DELETE FROM glossario WHERE id = $1 RETURNING *",
      [id]
    );

    if (rowCount <= 0) {
      return res.status(500).json({ mensagem: "Erro Interno ao excluir" });
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: `Erro Interno: ${error.message}` });
  }
};

// Exemplo de filtro por curso ou termo
const filtrarTermos = async (req, res) => {
  const { termo, curso } = req.query;

  try {
    let filtro = "SELECT * FROM glossario WHERE 1=1";
    const params = [];

    if (termo) {
      params.push(`%${termo}%`);
      filtro += ` AND termo ILIKE $${params.length}`;
    }

    if (curso) {
      params.push(`%${curso}%`);
      filtro += ` AND curso ILIKE $${params.length}`;
    }

    const { rows } = await query(filtro, params);

    if (rows.length === 0) {
      return res.status(404).json({ mensagem: "Nenhum termo encontrado" });
    }

    return res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ mensagem: `Erro Interno: ${error.message}` });
  }
};

module.exports = {
  listarTermos,
  adicionarTermo,
  editarTermo,
  excluirTermo,
  filtrarTermos,
};