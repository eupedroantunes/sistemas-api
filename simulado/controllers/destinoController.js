import { Destino } from "../models/Destino.js";
import { sequelize} from "../databases/connect.js";

export const destinoIndex = async (req, res) => {
    try {
        const destino = await Destino.findAll()
        res.status(200).json(destino)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const destinoStore = async (req, res) => {
    const {cidade, estado, distancia} = req.body;

    try {
        const novaCidade = await Destino.create({
            cidade,
            estado,
            distancia,
        })

        res.status(201).json(novaCidade)
    } catch (error) {
        res.status(400).json(error)
    }
}