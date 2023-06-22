import { Router } from "express"
import { usuarioIndex } from "./controllers/usuarioController"

const router = Router()

router.get('/users', usuarioIndex)