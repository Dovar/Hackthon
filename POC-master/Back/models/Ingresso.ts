import { Sequelize, DataTypes, Model } from 'sequelize'
import { db } from "../db"
    
export class Ingresso extends Model
{
    declare id : number
	declare data : string
	declare valor : number
    declare tipo_id : number
    declare categoria_id : number
}
    
Ingresso.init(
    {
        id:
        {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        data:{
            type: DataTypes.DATEONLY,
            allowNull:true
        },
        valor:
        {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true
        }
    },
    {
        sequelize: db,
        modelName: 'Ingresso',
        tableName: 'ingressos',
        timestamps: false
    }
)
