const knex = require("../banco de dados/conexao");

const listarTermos = async (req, res) => {
  try {
    const termos = await knex("glossario").select("*");

    if (!termos || termos.length === 0) {
      return res.status(404).json({ mensagem: "Não há termos cadastrados" });
    }

    return res.status(200).json(termos);
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
    const [novoTermo] = await knex("glossario")
      .insert({ termo, sigla, significado, curso })
      .returning("*");

    return res.status(201).json(novoTermo);
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
    const termoExistente = await knex("glossario").where({ id }).first();

    if (!termoExistente) {
      return res.status(404).json({ mensagem: "O termo não existe" });
    }

    const [termoAtualizado] = await knex("glossario")
      .update({ termo, sigla, significado, curso })
      .where({ id })
      .returning("*");

    return res.status(200).json(termoAtualizado);
  } catch (error) {
    return res.status(500).json({ mensagem: `Erro Interno: ${error.message}` });
  }
};

const excluirTermo = async (req, res) => {
  const { id } = req.params;

  try {
    const termoExistente = await knex("glossario").where({ id }).first();

    if (!termoExistente) {
      return res.status(404).json({ mensagem: "O termo não existe" });
    }

    const [termoExcluido] = await knex("glossario")
      .where({ id })
      .del()
      .returning("*");

    return res.status(200).json(termoExcluido);
  } catch (error) {
    return res.status(500).json({ mensagem: `Erro Interno: ${error.message}` });
  }
};

// Filtro por curso ou termo
const filtrarTermos = async (req, res) => {
  const { termo, curso } = req.query;

  try {
    let query = knex("glossario").select("*");

    if (termo) {
      query.whereILike("termo", `%${termo}%`);
    }

    if (curso) {
      query.whereILike("curso", `%${curso}%`);
    }

    const termos = await query;

    if (termos.length === 0) {
      return res.status(404).json({ mensagem: "Nenhum termo encontrado" });
    }

    return res.status(200).json(termos);
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