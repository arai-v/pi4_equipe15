import Sequelize from "sequelize";

// Criação da Conexão com o banco de dados
const connection = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '',
    // Descomentar após a segunda inicilizzação do projeto, para que seja criado o banco de dados
    database: 'tpgsystem',
    timezone: '-03:00'
})

export default connection