import { Sequelize, DataTypes, Model } from 'sequelize'
import { db } from '../db'

export class LogModel extends Model
{
    declare id : number
    declare action : string
    declare date : string
}

LogModel.init(
    {
        id:
        {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        action:
        {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        date:
        {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        sequelize: db,
        modelName: 'Log',
        tableName: 'logs',
        timestamps: false
    }
)

LogModel.sync()
