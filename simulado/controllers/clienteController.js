import { sequelize} from "../databases/connect.js";
import { Cliente } from "../models/Cliente.js";

export const clienteIndex = async (req, res) => {
    try {
        const cliente = await Cliente.findAll()
        res.status(200).json(cliente)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const clienteStore = async (req, res) => {
    const {nome, cpf, dataNasc} = req.body;

    try {
        const novoCliente = await Cliente.create({
            nome,
            cpf,
            dataNasc,
        })

        res.status(201).json(novoCliente)
    } catch (error) {
        res.status(400).json(error)
    }
}