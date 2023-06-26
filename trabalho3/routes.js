import { Router } from "express"
import { usuarioCreate, usuarioIndex } from "./controllers/usuarioController.js"
import { loginUsuario } from "./controllers/loginController.js"
import { verificaLogin } from "./middlewares/verificaLogin.js"

const router = Router()

router.get('/users', verificaLogin, usuarioIndex)
  .post('/users', usuarioCreate)
  .get('/login', loginUsuario)

export default router