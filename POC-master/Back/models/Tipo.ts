import { Sequelize, DataTypes, Model } from 'sequelize'
import { db } from "../db"
    
export class Tipo extends Model
{
    declare id : number
	declare descricao : string
    declare percentual_ingresso : number
}
    
Tipo.init(
    {
        id:
        {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        descricao:
        {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        percentual_ingresso:
        {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize: db,
        modelName: 'Tipo',
        tableName: 'tipos',
        timestamps: false
    }
)
