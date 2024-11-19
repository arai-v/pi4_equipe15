// Importando o Express e Inicializando Ele Através do app
import express from "express"
const app = express()
// Importando o Arquivo de Conexão
import connection from "./config/sequelize-config.js"
// Importando os Controllers
import ProfessorController from "./controllers/ProfessorController.js"
import AlunoController from "./controllers/AlunoController.js"
import UserController from "./controllers/UserController.js"
// Importando o Gerador de Sessões do Express
import session from "express-session"
// Importando o Auth
import Auth from "./middleware/Auth.js"
// Importando o express-flash
import flash from "express-flash"
// Configurando o Funcionamento da Sessão
app.use(session({
    secret:"tpgsecret",
    cookie:{maxAge: 3600000}, // Definição do tempo de duração de uma sessão até que ela seja expirada
    saveUninitialized: false,
    resave: false
}))
// Configurando o flash
app.use(flash())
// Realizando a Configuração com o Banco de Dados
connection.authenticate().then(()=>{
    console.log("Conexão com banco de dados bem sucedida!")
}).catch((error)=>{
    console.log(error)
})
// Criação do DataBase Caso Ele Não Exista
connection.query(`CREATE DATABASE IF NOT EXISTS tpgsystem;`).then(()=>{
    console.log("Database criado com sucesso!")
}).catch((erro)=>{
    console.log(erro)
})
// Definindo o EJS como Renderizador das Páginas
app.set('view engine','ejs')
// Definindo a Utilização da Pasta Public
app.use(express.static('public'))
// Configurando o Express para Recebimento de Dados Vindo de Formulários
app.use(express.urlencoded({extended:false}))
app.use(express.json())
// Definção das Rotas Controllers
app.use("/", AlunoController)
app.use("/", ProfessorController)
app.use("/", UserController)
// Rota Principal do Sistema
app.get("/",Auth,(req,res)=>{
    res.render("index",{
        messages:req.flash()
    })
})
// Rota de Cadastro
app.get("/cadastrar",Auth,(req,res)=>{
    res.render("cadastrar")
})
// Iniciando o Servidor na Porta 8080
app.listen(8080,function(erro){
    if(erro){
        console.log("Ops! Ocorreu um erro inesperado")
    }else{
        console.log("Servidor iniciado com êxito!")
    }
})