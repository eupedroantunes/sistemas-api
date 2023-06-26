import bcrypt from 'bcrypt'

import { Usuario } from '../models/Usuario.js';
import { validaSenha } from '../util/Util.js';
// import { Log } from "../models/Log.js";


export const usuarioIndex = async (req, res) => {


  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const usuarioCreate = async (req, res) => {
  const { nome, email, senha } = req.body

  // se não informou estes atributos
  if (!nome || !email || !senha) {
    res.status(400).json({ id: 0, msg: "Erro... Informe os dados" })
    return
  }

  const mensaValidacao = validaSenha(senha)
  if (mensaValidacao.length >= 1) {
    res.status(400).json({ id: 0, msg: mensaValidacao })
    return
  }  

  try {
    const usuario = await Usuario.create({
      nome, email, senha
    });
    res.status(201).json(usuario)
  } catch (error) {
    res.status(400).send(error)
  }
}

// export const usuarioAlteraSenha = async (req, res) => {
//   const { email, senha, novaSenha } = req.body

//   // se não informou estes atributos
//   if (!email || !senha || !novaSenha) {
//     res.status(400).json({ id: 0, msg: "Erro... Informe os dados" })
//     return
//   }

//   try {
//     const usuario = await Usuario.findOne({ where: { email } })

//     if (usuario == null) {
//       res.status(400).json({ erro: "Erro... E-mail inválido" })
//       return
//     }

//     const mensaValidacao = validaSenha(novaSenha)
//     if (mensaValidacao.length >= 1) {
//       res.status(400).json({ id: 0, msg: mensaValidacao })
//       return
//     }  

//     if (bcrypt.compareSync(senha, usuario.senha)) {

//       // gera a criptografia da nova senha
//       const salt = bcrypt.genSaltSync(12)
//       const hash = bcrypt.hashSync(novaSenha, salt)
//       usuario.senha = hash

//       // salva a nova senha
//       await usuario.save()

//       res.status(200).json({ msg: "Ok. Senha Alterada com Sucesso" })
//     } else {

//       // registra um log desta tentativa de troca de senha
//       await Log.create({
//         descricao: "Tentativa de Alteração de Senha",
//         usuario_id: usuario.id
//       })

//       res.status(400).json({ erro: "Erro... Senha inválida" })
//     }
//   } catch (error) {
//     res.status(400).json(error)
//   }
// }
