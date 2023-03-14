import { Client } from "../models/Client.js";

export const clientIndex = async (req, res) => {
  try {
    const clients = await Client.findAll()

    res.status(200).json(clients)
  } catch (error) {
    res.status(400).json(error)
  }
};

export const clientStore = async (req, res) => {
  const { firstName, lastName, birth, cpf, mobilePhone, email } = req.body;

  try {
    const newClient = await Client.create({
      firstName,
      lastName,
      birth,
      cpf,
      mobilePhone,
      email
    })

    res.status(201).json(newClient)
  } catch (error) {
    res.status(400).json(error)
  }
};

export const clientUpdate = async (req, res) => {
  const { id } = req.params;

  const { mobilePhone, email } = req.body;

  try {
    const updateClientInfo = await Client.update({ mobilePhone, email }, { where: { id } })

    const clientUpdated = await Client.findOne({ where: { id } });
    res.status(200).json(clientUpdated)
  } catch (error) {
    res.status(400).json(error)
  }


};