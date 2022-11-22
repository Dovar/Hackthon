import { Request, Response, NextFunction } from 'Express'
import { Op, WhereOptions, Includeable } from 'sequelize'
import { Categoria } from '../models/Categoria'

import { Ingresso } from '../models/Ingresso'

import { Log } from '../logs'
const newLog = new Log()

export class CategoriasController
{
    index = async (req : Request, res : Response, next : NextFunction) =>
    {
        try
        {
            const params = req.query
            const limit = Number(params.limit) || 100
            const page = Number(params.page) || 1
            const offset = (page - 1) * limit
            const sort : any = params.sort || 'id'
            const order : any = params.order || 'ASC'
            const where : WhereOptions =
            {
                
            }
            const include : Includeable[] =
            [
				
            ]
            
            if (params.descricaoEqual)
            {
                where.descricao =
                {
                    [Op.eq]: params.descricaoEqual // =
                }
            }
            if (params.descricaoNotEqual)
            {
                where.descricao =
                {
                    [Op.ne]: params.descricaoNotEqual // !=
                }
            }
            if (params.descricaoContains)
            {
                where.descricao =
                {
                    [Op.like]: `%${params.descricaoContains}%` // CONTAINS CASE SENSITIVE
                }
            }
            if (params.descricaoNotContains)
            {
                where.descricao =
                {
                    [Op.notLike]: `%${params.descricaoNotContains}%` // NOT CONTAINS CASE SENSITIVE
                }
            }
            if (params.descricaoIContains)
            {
                where.descricao =
                {
                    [Op.iLike]: `%${params.descricaoIContains}%` // CONTAINS CASE INSENSITIVE
                }
            }
            if (params.descricaoNotIContains)
            {
                where.descricao =
                {
                    [Op.notILike]: `%${params.descricaoNotIContains}%` // NOT CONTAINS CASE INSENSITIVE
                }
            }

            const data = await Categoria.findAll(
                {
                    include: include,
                    where: where,
                    limit: limit,
                    offset: offset,
                    order: [ [sort, order] ]
                }
            )
            res.json(data)
        }
        catch (error : any)
        {
            res.status(400).json({ error: error.message })
        }
    }
    show = async (req : Request, res : Response, next : NextFunction) =>
    {
        try
        {
            const include : Includeable[] =
            [
				{ model: Ingresso },
            
            ]

            const id = req.params.categoriaId
            const data = await Categoria.findByPk(id,
            {
                include: include
            })
            res.json(data)
        }
        catch (error : any)
        {
            res.status(400).json({ error: error.message })
        }
    }
    create = async (req : Request, res : Response, next : NextFunction) =>
    {
        try
        {
            const newCategoria = await this._validateData(req.body)
            const data = await Categoria.create(newCategoria)
            await newLog.add('New Categoria created!')
            res.json(data)
        }
        catch (error : any)
        {
            res.status(400).json({ error: error.message })
        }
    }
    update = async (req : Request, res : Response, next : NextFunction) =>
    {
        try
        {
            const id = req.params.categoriaId
            const data = await this._validateData(req.body, id)
            await Categoria.update(data,
                {
                    where:
                    {
                        id: id
                    }
                })
            await newLog.add('Categoria updated!')
            res.json(await Categoria.findByPk(id))
        }
        catch (error : any)
        {
            res.status(400).json({ error: error.message })
        }
    }
    delete = async (req : Request, res : Response, next : NextFunction) =>
    {
        try
        {
            const id = req.params.categoriaId
            await Categoria.destroy(
                {
                    where:
                    {
                        id: id
                    }
                })
            await newLog.add('Categoria deleted!')
            res.json({})
        }
        catch (error : any)
        {
            res.status(400).json({ error: error.message })
        }
    }
    _validateData = async (data : any, id? : string) =>
    {
        const requiredAttributes : any =
        [
			'descricao',
        ]
        for (const attribute of requiredAttributes)
        {
            if (data[attribute] === undefined)
            {
                throw new Error(`The attribute ${attribute} is required.`)
            }
            if (await this._checkIfDescricaoExists(data.descricao, id))
            {
                throw new Error(`The tipo with descricao ${data.descricao} already exists.`)
            }
        }
        
        return data
    }
	_checkIfDescricaoExists = async (descricao : any, id? : string) =>
    {
        let where = {}
        
        if (id)
        {
            where =
            {
                id: { [Op.ne]: id }, // WHERE id != id,
                descricao: descricao
            }
        }
        else
        {
            where =
            {
                descricao: descricao
            }
        }
      
        const count = await Categoria.count({
            where: where
        })
      
        return count > 0
    }
}
