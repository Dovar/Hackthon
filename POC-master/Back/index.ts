import express, { Express, Request, Response, NextFunction } from 'Express'
import cors from 'cors'
import { router } from './routes/index'
import { createAssociations } from './models/Associations'

createAssociations()

const PORT = 3000

const app : Express = express()
app.use(express.json())

app.use(cors())

app.use((req : Request, res : Response, next : NextFunction) =>
{
    console.log(`[${new Date()}] ${req.method} ${req.url}`)
    next()
})

app.use(router)

app.listen(PORT, () =>
{
    console.log('Servidor rodando!')
})
