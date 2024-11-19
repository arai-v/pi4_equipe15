import Sequelize from "sequelize"
import connection from "../config/sequelize-config.js"

const User = connection.define('usuarios',{
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    senha:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

User.sync({force:false})

export default User