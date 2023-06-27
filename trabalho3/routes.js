import { Router } from "express"
import { usuarioAlteraSenha, usuarioCreate, usuarioIndex } from "./controllers/usuarioController.js"
import { loginUsuario } from "./controllers/loginController.js"
import { verificaLogin } from "./middlewares/verificaLogin.js"
import { vendaCreate, vendaDelete, vendaIndex, vendaUpdate, vendaSearch } from "./controllers/vendaController.js"
import { enviaEmail } from "./controllers/mailController.js"
import { logIndex } from "./controllers/logController.js"

const router = Router()

router.get('/users', verificaLogin, usuarioIndex)
  .post('/users', usuarioCreate)
  .put('/users', usuarioAlteraSenha)
  
router.get('/sales', vendaIndex)
  .post('/sales', verificaLogin, vendaCreate)
  .delete('/sales/:id', verificaLogin, vendaDelete)
  .put('/sales/:id', verificaLogin, vendaUpdate)
  .get('/sales/user/:id', verificaLogin, vendaSearch)
  
router.get('/login', loginUsuario)

router.get('/enviaemail', enviaEmail)

router.get('/logs', verificaLogin, logIndex)


export default router