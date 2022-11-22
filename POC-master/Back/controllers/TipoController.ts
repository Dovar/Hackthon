import { Request, Response, NextFunction } from 'Express'
import { Op, WhereOptions, Includeable } from 'sequelize'
import { Tipo } from '../models/Tipo'

import { Ingresso } from '../models/Ingresso'

import { Log } from '../logs'
const newLog = new Log()

export class tiposController
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

            const data = await Tipo.findAll(
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

            const id = req.params.tipoId
            const data = await Tipo.findByPk(id,
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
            const newTipo = await this._validateData(req.body)
            const data = await Tipo.create(newTipo)
            await newLog.add('New Tipo created!')
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
            const id = req.params.tipoId
            const data = await this._validateData(req.body, id)
            await Tipo.update(data,
                {
                    where:
                    {
                        id: id
                    }
                })
            await newLog.add('Tipo updated!')
            res.json(await Tipo.findByPk(id))
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
            const id = req.params.tipoId
            await Tipo.destroy(
                {
                    where:
                    {
                        id: id
                    }
                })
            await newLog.add('Tipo deleted!')
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
      
        const count = await Tipo.count({
            where: where
        })
      
        return count > 0
    }
}
