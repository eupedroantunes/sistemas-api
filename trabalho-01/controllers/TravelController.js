import { Travel } from "../models/Travel.js";
import { sequelize } from "../database/connect.js";
import { Op } from 'sequelize';

export const travelIndex = async (req, res) => {
    try {
        const travel = await Travel.findAll()
        res.status(200).json(travel)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const travelStore = async (req, res) => {
    const { departure, destination, transportation, price, duration } = req.body;

    try {
        const newTravel = await Travel.create({
            departure,
            destination,
            transportation,
            price,
            duration
        })

        res.status(201).json(newTravel)
    } catch (error) {
        res.status(400).send(error)
    }
}

export const travelUpdate = async (req, res) => {
    const { id } = req.params
    const { transportation, price } = req.body

    const travel = await Travel.findOne({ where: { id } })

    const data = travel.dataValues

    try {
        const updateTravel = await Travel.update({ transportation, price }, { where: { id } })

        const travelUpdated = await Travel.findOne({ where: { id } })

        res.status(200).json(travelUpdated)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const travelDelete = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTravel = await Travel.findOne({ where: { id } })

        await Travel.destroy({ where: { id } }, { trucate: true });

        res.status(200).json(deletedTravel)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const travelTransportation = async (req, res) => {
    try {
        const travel = await Travel.findAll({
            attributes: [
                'transportation',
                [sequelize.fn('count', sequelize.col('id')), 'quant']
            ],
            group: ['transportation']
        })
        res.status(200).json(travel)
    } catch (error) {
        res.status(400).send(error)
    }
}

export const travelTransportationType = async (req, res) => {
    const { type } = req.params

    try {
        const travel = await Travel.findAll({
            where: {
                transportation: {
                 [Op.substring]: type
                }
            }
        })
        
        console.log(travel)
        res.status(200).json(travel)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const travelPriceSearch = async (req, res) => {
    if (req.params.min) {
        const { max, min } = req.params
        try {
            const travel = await Travel.findAll({
                where: {
                    price: {
                        [Op.between]: [min, max]
                    }
                }
            });
            res.status(200).json(travel)
        } catch (error) {
            res.status(400).send(error)
        }
    } else {
        const { max } = req.params
        try {
            const travel = await Travel.findAll({
                where: {
                    price: {
                        [Op.lte]: max
                    }
                }
            });
            res.status(200).json(travel)
        } catch (error) {
            res.status(400).send(error)
        }

    }
}

export const priceIncrease = async (req, res) => {
    const { increase } = req.params;
    // const multiple = 1 + (increase / 100)

    try {
        await Travel.increment({ price: increase }, { where: {} });

        const travel = await Travel.findAll()
        
        res.status(200).json(travel)
    } catch (error) {
        res.status(400).send(error)
    }
}

export const travelStats = async (req, res) => {
    try {
        const totalTravel = await Travel.count()
        const totalPrice = await Travel.sum('price')
        const totalDays = await Travel.sum('duration')

        const averagePrice = (totalPrice / totalTravel).toFixed(2)
        const averageDay = totalDays / totalTravel

        res.status(200).json({averageDay, averagePrice})
    } catch (error) {
        res.status(400).send(error)
    }
}

export const destinationName = async (req, res) => {
    try {
      const travel = await Travel.findAll({
        attributes: ['destination', 'price', 'duration'],
        order: [
          ['destination', 'ASC']
        ]
      });
      res.status(200).json(travel)
    } catch (error) {
      res.status(400).send(error)
    }
  }