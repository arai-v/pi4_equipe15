import express from "express"
import Aluno from "../models/Aluno.js"
import Auth from "../middleware/Auth.js"
const router = express.Router()

// Rota Aluno
router.get("/alunos",Auth,(req,res)=>{
    Aluno.findAll().then(alunos =>{
        res.render("alunos",{
            alunos:alunos
        })
    })
})

// Rota Tela de Cadastro Aluno
router.get("/cadastrarAluno",Auth,(req,res)=>{
    res.render("cadastrarAluno")
})

// Rota Cadastro de Aluno
router.post("/alunos/cadastrar",Auth,(req,res)=>{
    const nome = req.body.nome
    const endereco = req.body.endereco
    const ra = req.body.ra
    const email = req.body.email
    const senha = req.body.senha
    Aluno.create({
        nome:nome,
        endereco:endereco,
        ra:ra,
        email:email,
        senha:senha
    }).then(()=>{
        res.redirect("/alunos")
    }).catch(erro =>{
        console.log(erro)
    })
})

// Rota Exclusão de Aluno
router.get("/alunos/deletar/:id",Auth,(req,res)=>{
    const id = req.params.id
    Aluno.destroy({
        where:{
            id:id
        }
    }).then(()=>{
        res.redirect("/alunos")
    }).catch(erro => {
        console.log(erro)
    })
})

// Rota de edição do Aluno
router.get("/alunos/editar/:id",Auth,(req,res)=>{
    const id = req.params.id
    Aluno.findByPk(id).then(function(aluno){
        res.render("alunoEditar",{
            aluno:aluno
        })
    })
})

// Rota para alteração de informações do Aluno
router.post("/alunos/update/:id",Auth,(req,res)=>{
    const id = req.body.id
    const nome = req.body.nome
    const endereco = req.body.endereco
    const ra = req.body.ra
    const email = req.body.email
    const senha = req.body.senha
    Aluno.update({
        nome:nome,
        endereco:endereco,
        ra:ra,
        email:email,
        senha:senha
    },{where:{id:id}}).then(()=>{
        res.redirect("/alunos")
    })
})

// Exportando as Rotas do Aluno
export default router