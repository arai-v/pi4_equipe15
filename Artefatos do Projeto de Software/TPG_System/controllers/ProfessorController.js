import express from "express"
import Professor from "../models/Professor.js"
import Auth from "../middleware/Auth.js"
const router = express.Router()

// Rota Professor
router.get("/professores",Auth,(req,res)=>{
    Professor.findAll().then(professores=>{
        res.render("professores",{
            professores:professores
        })
    })
})

// Rota tela de cadastro
router.get("/cadastrarProf",Auth,(req,res)=>{
    res.render("cadastrarProf")
})

// Rota de Cadastro Professor
router.post("/professores/cadastrar",Auth,(req,res)=>{
    const nome = req.body.nome
    const endereco = req.body.endereco
    const telefone = req.body.telefone
    const cpf = req.body.cpf
    const email = req.body.email
    const senha = req.body.senha
    Professor.create({
        nome:nome,
        endereco:endereco,
        telefone:telefone,
        cpf:cpf,
        email:email,
        senha:senha
    }).then(()=>{
        res.redirect("/professores")
    }).catch(erro =>{
        console.log(erro)
    })
})

// Rota Exclusão de Professor
router.get("/professores/deletar/:id",Auth,(req,res)=>{
    const id = req.params.id
    Professor.destroy({
        where:{
            id:id
        }
    }).then(()=>{
        res.redirect("/professores")
    }).catch(erro =>{
        console.log(erro)
    })
})

// Rota pra Edição Professor
router.get("/professores/editar/:id",Auth,(req,res)=>{
    const id = req.params.id
    Professor.findByPk(id).then(professor =>{
        res.render("professorEditar",{
            professor:professor
        })
    })
})

// Rota para Alteração de Informação do Professor
router.post("/professores/update/:id",Auth,(req,res)=>{
    const id = req.body.id
    const nome = req.body.nome
    const endereco = req.body.endereco
    const telefone = req.body.telefone
    const cpf = req.body.cpf
    const email = req.body.email
    const senha = req.body.senha
    Professor.update({
        nome:nome,
        endereco:endereco,
        telefone:telefone,
        cpf:cpf,
        email:email,
        senha:senha
    },{where:{id:id}}).then(()=>{
        res.redirect("/professores")
    })
})

// Exportando as Rotas Professores
export default router
