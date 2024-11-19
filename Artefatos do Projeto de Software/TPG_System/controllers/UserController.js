import express from "express"
import User from "../models/User.js"
const router = express.Router()
// Importando bcrypt (hash de senha)
import bcrypt from "bcrypt" 

// Rota de Login
router.get("/login",(req, res) => {
  res.render("login",{
    loggedOut: true,
    messages: req.flash()
  })
})

// Rota para Saída
router.get("/logout",(req, res) => {
  req.session.user = undefined
  res.redirect("/")
})

// Rota de Cadastro do Usuário
router.get("/cadastroAdm", (req, res) => {
  res.render("cadastrarAdm",{
    messages: req.flash()
  })
})

// Rota de Criação do Usuário
router.post("/criarAdm", (req, res) => {
  // Coleta das Informações
  const email = req.body.email
  const senha = req.body.senha

  // Verifica se o Usuário já Possuí Cadastro no Banco
  User.findOne({where: {email : email}}).then(user => {
    // Caso Não Haja
    if(user == undefined){
      // Realizando o Cadastro
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(senha, salt)
      User.create({
        email : email,
        senha : hash
      }).then(() => {
        res.redirect("/login")
      })

    // Caso já Exista o Usuário no Banco
    } else {
      req.flash('danger', 'O usuário já está cadastrado! Faça o login.')
      res.redirect("/login")
    }
  })
})

// Rota de Autenticação
router.post("/autenticar", (req, res) => {
  const email = req.body.email
  const senha = req.body.senha
  // Procura o Usuário no Banco
  User.findOne({where: {email : email}}).then(user => {
    // Caso Usuário Exista
    if (user != undefined) { 
      // Valida a Senha
      const correct = bcrypt.compareSync(senha, user.senha)
      // Caso Senha Correta
      if(correct){
        // Autorização do Login
        req.session.user = {
          id: user._id,
          email: user.email
        }
        // Mensagem após Logar com sucesso
        req.flash('success', 'Login efetuado com sucesso!')
        res.redirect("/")
      // Caso Senha Incorreta
      } else {
        // Exibir Mensagem
        req.flash('danger', 'A senha informada está incorreta! Tente novamente.')
        res.redirect("/login")
      }
    // Caso Usuário Não Exista
    } else {
      // Exibir Mensagem
      req.flash('danger', 'O usuário informado não existe! Verifique os dados digitados.')
      res.redirect("/login")
    }
  })
})

export default router