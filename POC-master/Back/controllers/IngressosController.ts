import { Request, Response, NextFunction } from 'Express'
import { Op, WhereOptions, Includeable } from 'sequelize'
import  fs  from  'fs'
import  pdf, { CreateOptions } from 'html-pdf'
import { Ingresso } from '../models/Ingresso'

import nodemailer from "nodemailer"


import { Log } from '../logs'
import { Tipo } from '../models/Tipo'
const newLog = new Log()

export class ingressosController
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
            console.log(sort)
            const order : any = params.order || 'ASC'
            const where : WhereOptions =
            {
                
            }
            const include : Includeable[] =
            [
                { model: Tipo }
            ]
            
            if (params.dataEqual)
            {
                where.data =
                {
                    [Op.eq]: params.dataEqual // =
                }
            }
            if (params.dataNotEqual)
            {
                where.data =
                {
                    [Op.ne]: params.dataNotEqual // !=
                }
            }
            if (params.dataGreaterThan)
            {
                where.data =
                {
                    [Op.gt]: params.dataGreaterThan // >
                }
            }
            if (params.dataGreaterOrEqualThan)
            {
                where.data =
                {
                    [Op.gte]: params.dataGreaterOrEqualThan // >=
                }
            }
            if (params.dataLessThan)
            {
                where.data =
                {
                    [Op.lte]: params.dataLessThan // <
                }
            }
            if (params.dataLessOrEqualThan)
            {
                where.data =
                {
                    [Op.lte]: params.dataLessOrEqualThan // <=
                }
            }
            if (params.dataBetween)
            {
                where.data =
                {
                    [Op.between]: params.dataBetween // BETWEEN
                }
            }
            if (params.dataNotBetween)
            {
                where.data =
                {
                    [Op.notBetween]: params.dataNotBetween // NOT BETWEEN
                }
            }
            if (params.dataEqual)
            {
                where.data =
                {
                    [Op.eq]: params.dataEqual // =
                }
            }
            if (params.dataNotEqual)
            {
                where.data =
                {
                    [Op.ne]: params.dataNotEqual // !=
                }
            }
            if (params.dataGreaterThan)
            {
                where.data =
                {
                    [Op.gt]: params.dataGreaterThan // >
                }
            }
            if (params.dataGreaterOrEqualThan)
            {
                where.data =
                {
                    [Op.gte]: params.dataGreaterOrEqualThan // >=
                }
            }
            if (params.dataLessThan)
            {
                where.data =
                {
                    [Op.lte]: params.dataLessThan // <
                }
            }
            if (params.dataLessOrEqualThan)
            {
                where.data =
                {
                    [Op.lte]: params.dataLessOrEqualThan // <=
                }
            }
            if (params.dataBetween)
            {
                where.data =
                {
                    [Op.between]: params.dataBetween // BETWEEN
                }
            }
            if (params.dataNotBetween)
            {
                where.data =
                {
                    [Op.notBetween]: params.dataNotBetween // NOT BETWEEN
                }
            }
            if (params.type)
            {
                where.tipo_id = params.type
            }
            if (params.type)
            {
                where.categoria_id = params.type
            }

            const data = await Ingresso.findAll(
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
                { model: Tipo }
            ]

            const id = req.params.ingressoId
            const data = await Ingresso.findByPk(id,
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
            const newIngresso = await this._validateData(req.body)
            const data = await Ingresso.create(newIngresso)
            await newLog.add('New Ingresso created!')
            res.json(data)
        }
        catch (error : any)
        {
            res.status(400).json({ error: error.message })
        }
    }
    createMultiple = async (req : Request, res : Response, next : NextFunction) =>
    {
        try
        {
            const number = Number(req.params.number)

            for (let i = 1; i <= number; i++)
            {
                const a: number = Math.floor(Math.random() * 4) + 1;
                const b: number = Math.floor(Math.random() * 4) + 1;
                var x: number = 0;
                var y: number = 30;
                if (a == 1) {
                    x = 100;
                } else if (a == 2) {
                    x = 50;
                } else if (a == 3) {
                    x= 25;
                };
                if (b == 1) { 
                    y = 200;
                } else if (b == 2) {
                    y= 100;
                } else if (b == 3) { 
                    y = 50;
                };
                const newIngresso =
                {
                    data: String(new Date()),
                    tipo_id: a,
                    categoria_id: b,
                    valor: ((x*y)/100)
                }
                const data = await Ingresso.create(newIngresso)
                await newLog.add('New Ingresso created!')
            }
            res.json({ success: 'success' })
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
            const id = req.params.ingressoId
            const data = await this._validateData(req.body, id)
            await Ingresso.update(data,
                {
                    where:
                    {
                        id: id
                    }
                })
            await newLog.add('Ingresso updated!')
            res.json(await Ingresso.findByPk(id))
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
            const id = req.params.ingressoId
            await Ingresso.destroy(
                {
                    where:
                    {
                        id: id
                    }
                })
            await newLog.add('Ingresso deleted!')
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
			'data',
			'valor',
            'tipo_id',
            'categoria_id'
        ]
        for (const attribute of requiredAttributes)
        {
            if (data[attribute] === undefined)
            {
                throw new Error(`The attribute ${attribute} is required.`)
            }
        }
        
        return data
    }
    generatePDF = async (req : Request, res : Response, next : NextFunction) =>
    {
        const ingressos = await Ingresso.findAll(
            {
                order: [ ['id', 'ASC'] ]
            }
        )

        let html = ``

        html += `<h1 style="text-align: center;">Relatório de Ingressos</h1>`
        html += `<table border="1" style="width: 100%;">`
        html += `<thead>`
        html += `<tr>`
        html += `<th>#</th>`
        html += `<th>Data</th>`
        html += `<th>Valor</th>`
        html += `<th>Tipo ID</th>`
        html += `<th>Categoria ID</th>`
        html += `</tr>`
        html += `</thead>`

        html += `<tbody>`

        for (const ingresso of ingressos)
        {
            html += `<tr>`

            const values = ingresso
            
            html += `<td>${values.id}</td>`
            html += `<td>${values.data}</td>`
            html += `<td>${values.valor}</td>`
            html += `<td>${values.tipo_id}</td>`
            html += `<td>${values.categoria_id}</td>`

            html += `</tr>`
        }

        html += `</tbody>`
        html += `</table>`

        const options : CreateOptions =
        {
            type: 'pdf',
            format: 'A4',
            orientation: 'landscape'
        }

        pdf.create(html, options).toBuffer((err, buffer) =>
        {
            if (err)
            {
                return res.status(500).json(err)
            }

            res.end(buffer)
        })
    }
}
