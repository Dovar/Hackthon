import { Router } from 'Express'
import { CategoriasController } from '../controllers/CategoriasController'

const CategoriaController = new CategoriasController()
export const categoria : Router = Router()

categoria.get('/categoria', CategoriaController.index)
categoria.get('/categoria/:categoriaId', CategoriaController.show)
categoria.post('/categorias', CategoriaController.create)
categoria.put('/categorias/:categoriaId', CategoriaController.update)
categoria.delete('/categorias/:categoriaId', CategoriaController.delete)