import { Usuario } from "../models/Usuario.js";
import { Venda } from "../models/Venda.js";
import { Log } from "../models/Log.js";

export const vendaIndex = async (req, res) => {
  try {
    const venda = await Venda.findAll({
      include: Usuario,
    });
    res.status(200).json(venda);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const vendaCreate = async (req, res) => {
  const { valor } = req.body;
  const data = new Date();
  const usuario_id = req.user_logado_id;

  // se não informou estes atributos
  if (!valor || !usuario_id) {
    res.status(400).json({ id: 0, msg: "Erro... Informe os dados" });
    console.log(usuario_id);
    return;
  }

  try {
    const venda = await Venda.create({
      valor,
      data,
      usuario_id,
    });

    res.status(201).json(venda);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const vendaDelete = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Venda.findOne({ where: { id } });
    const user_logado_id = req.user_logado_id;
    const user = await Usuario.findOne({
      attributes: ["role"],
      where: { id: user_logado_id },
    });

    if (user.role != "SUPER_ADMIN") {
      await Log.create({
        descricao: "Tentativa de exclusão de venda " + id,
        usuario_id: user_logado_id,
      });

      res.status(200).json({id:0, msg: "Usuário sem permissão de excluir venda"})
    } else {
      await Venda.destroy({
        where: {
          id,
        },
      });
  
      await Log.create({
        descricao: "Exclusão de Venda " + id,
        usuario_id: user_logado_id,
      });
  
      res.status(200).json(deleted);
    }

  } catch (error) {
    res.status(400).json(error);
  }
};

export const vendaUpdate = async (req, res) => {
  const { valor, usuario_id } = req.body;
  const { id } = req.params;

  try {
    await Venda.update({ valor, usuario_id }, { where: { id } });

    const updated = await Venda.findOne({ where: { id } });

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const vendaSearch = async (req, res) => {
  const { id } = req.params;

  try {
    const seller = await Usuario.findOne({
      attributes: ["id", "nome", "email"],
      where: { id },
    });
    const sales = await Venda.count({ where: { usuario_id: id } });
    const totalPrice = await Venda.sum("valor", { where: { usuario_id: id } });

    res.status(200).json({ sales, totalPrice, seller });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const vendaPrice = async (req, res) => {
  const { min, max } = req.params;
};
