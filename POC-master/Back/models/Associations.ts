import { Tipo } from './Tipo'
import { Ingresso } from './Ingresso'
import { Categoria} from './Categoria'

export const createAssociations = () =>
{
    
    Ingresso.belongsTo(Tipo, {
        foreignKey: {
            name: 'tipo_id',
            allowNull: false
        },
        targetKey: 'id',
    })
    Tipo.hasMany(Ingresso, {
        foreignKey: {
            name: 'tipo_id',
            allowNull: false
        },
        sourceKey: 'id',
    })
    Ingresso.belongsTo(Categoria,{
        foreignKey: {
            name: 'categoria_id',
            allowNull: false
        },
        targetKey: 'id',
    })
    Categoria.hasMany(Ingresso, {
        foreignKey:{
            name: 'categoria_id',
            allowNull: false
        },
        sourceKey: 'id',
    })

}
