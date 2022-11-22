import { Router } from 'Express'
import { ingressosController } from '../controllers/ingressosController'

const ingressoController = new ingressosController()
export const ingresso : Router = Router()

//ingresso.get('/ingressos/create/:number', ingressoController.createMultiple)

ingresso.get('/ingressos/pdf', ingressoController.generatePDF)

ingresso.get('/ingressos', ingressoController.index)
ingresso.get('/ingressos/:ingressoId', ingressoController.show)
ingresso.post('/ingressos', ingressoController.create)
ingresso.put('/ingressos/:ingressoId', ingressoController.update)
ingresso.delete('/ingressos/:ingressoId', ingressoController.delete)
