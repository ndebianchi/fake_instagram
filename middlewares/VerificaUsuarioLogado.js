const VerificaUsuarioLogado = (req, res, next) => {
    //Se não a session não tiver setada, redireciona para login
    if(!req.session.usuario){
        res.redirect('/login?error=2');
    }
    
    // se estiver ok, va em frente
    next();
}

module.exports = VerificaUsuarioLogado;