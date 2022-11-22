import { Sequelize } from 'sequelize';

export const db = new Sequelize("database",'user','password',
{
    dialect: 'postgres',
    host: '',
    //port: ,
})

db.sync()
