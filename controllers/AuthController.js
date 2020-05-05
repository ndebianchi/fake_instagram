const { Usuario, Post, Comentario } = require('../models'); // desestruturado 
const bcrypt = require('bcrypt');

const AuthController = {
    
    showLogin: (req,res) => {
        res.render('auth/login');
    },

    showRegistro: (req,res) => {
        res.render('auth/register');
    },

    showHome: async (req,res) => {
        // carregar posts com comentarios
        let posts = await Post.findAll(
            {
                include: [
                    {
                        model: Comentario,
                        as: 'comentarios',
                        include: 'usuario'
                    },
                     'usuario'
                ]})   

        res.render('index', {posts});        
    },
    
    login: async (req, res) => {
        
        // Lendo as info do body
        const { email, senha } = req.body;

        // tentar carregar usuario
        const user = await Usuario.findOne({ where: { email } });
        
        // verifica se existe usuario com o email passado
        if(!user) {
            res.redirect('/login?error=1')
        }

        // validar a senha passada via post x a do banco
        if (!bcrypt.compareSync(senha, user.senha)) {
            res.redirect('/login?error=1')
        }

        // setar uma session com o usuário
        req.session.usuario = user;

        // redirecionar para rota '/home'
        res.redirect('/home');
    }

}

module.exports = AuthController;