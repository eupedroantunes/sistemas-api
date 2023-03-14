import express from 'express';
import cors from 'cors';
import { sequelize } from './databases/connect.js';
import { Product } from './models/Product.js';
import { Client } from './models/Client.js';
import routes from './routes.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(routes);
app.use(cors());

async function connect_db() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully');

    await Product.sync({ alter: true });
    // await Client.sync({alter: true});
    console.log("All models were synchronised successfully");

  } catch (error) {
    console.log('Unable to connect to database', error)
  }
}

connect_db();


app.get('/', (req, res) => {
  res.send('Desenvolvimento de Serviços e APIs')
});

app.listen(port, () => {
  console.log(`Example app listening on port {port}`)
});