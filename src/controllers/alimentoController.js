const AlimentoModel = require("../models/alimentoModel");

exports.getEstado = (req, res) => {
  res.json(AlimentoModel.getState());
};

exports.adicionarAlimento = (req, res) => {
  const { nome, carboidratos, proteinas, gorduras } = req.body;
  if (!nome || carboidratos == null || proteinas == null || gorduras == null) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios." });
  }
  AlimentoModel.createAlimento(req.body);
  res.status(201).json(AlimentoModel.getState());
};

exports.deletarAlimento = (req, res) => {
  const success = AlimentoModel.deleteAlimento(parseInt(req.params.id));
  if (!success) {
    return res.status(404).json({ message: "Alimento não encontrado." });
  }
  res.json(AlimentoModel.getState());
};

exports.definirMeta = (req, res) => {
  const { peso, objetivo } = req.body;
  if (!peso || !objetivo) {
    return res
      .status(400)
      .json({ message: "Peso e objetivo são obrigatórios." });
  }

  AlimentoModel.setMetaDiaria(peso, objetivo);
  res.json(AlimentoModel.getState());
};
