import { Sequelize, DataTypes, Model } from 'sequelize'
import { db } from "../db"
    
export class Categoria extends Model
{
    declare id : number
	declare descricao : string
	declare preco : string
}
    
Categoria.init(
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
        preco:
        {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        }
    },
    {
        sequelize: db,
        modelName: 'Categoria',
        tableName: 'categorias',
        timestamps: false
    }
)
