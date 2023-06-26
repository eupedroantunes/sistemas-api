import express from "express";
import cors from "cors";
import routes from "./routes.js";

import { sequelize } from "./databases/connect.js";
import { Usuario } from "./models/Usuario.js";
import { Log } from "./models/Log.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(routes);

async function connect_db() {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados realizada com sucesso");

    await Usuario.sync();
    await Log.sync();
  } catch (error) {
    console.error("Erro na conexão com o banco: ", error);
  }
}

connect_db();

app.get("/", (req, res) => {
  res.send("API do Trabalho #03");
});

app.listen(port, () => {
  console.log(`Servidor Rodando na Porta: ${port}`);
});
