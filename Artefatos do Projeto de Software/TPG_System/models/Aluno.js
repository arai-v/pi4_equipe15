import Sequelize from "sequelize"
import connection from "../config/sequelize-config.js"

const Aluno = connection.define('alunos',{
    nome:{
        type: Sequelize.STRING,
        allowNull:false
    },
    endereco:{
        type: Sequelize.STRING,
        allowNull:false
    },
    ra:{
        type: Sequelize.INTEGER,
        allowNull:false
    },
    email:{
        type: Sequelize.STRING,
        allowNull:false
    },
    senha:{
        type: Sequelize.STRING,
        allowNull:false
    }
})

Aluno.sync({force:false})
export default Aluno