import { Log } from "../models/Log.js";
import { Usuario } from "../models/Usuario.js";

export const logIndex = async (req, res) => {
  try {
    const logs = await Log.findAll({
      include: Usuario
    })
    const user_logado_id = req.user_logado_id;
    const user = await Usuario.findOne({
      attributes: ["role"],
      where: { id: user_logado_id },
    });    

    if (user.role != "SUPER_ADMIN") {
      res.status(200).json({id:0, msg: "Usuário sem permissão de verificar logs"})
      return
    } else {
      res.status(200).json(logs)
    }
  } catch (error) {
    res.status(400).json(error);
  }
}