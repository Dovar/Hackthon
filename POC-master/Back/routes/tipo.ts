import { Router } from 'Express'
import { tiposController } from '../controllers/TipoController'

const tipoController = new tiposController()
export const tipo : Router = Router()

tipo.get('/tipos', tipoController.index)
tipo.get('/tipos/:tipoId', tipoController.show)
tipo.post('/tipos', tipoController.create)
tipo.put('/tipos/:tipoId', tipoController.update)
tipo.delete('/tipos/:tipoId', tipoController.delete)
