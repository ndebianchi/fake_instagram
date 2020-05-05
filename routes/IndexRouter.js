var express = require('express');
var router = express.Router();

const VerificarUsuarioLogado = require("../middlewares/VerificaUsuarioLogado")
const AuthController = require("../controllers/AuthController");

router.get('/', AuthController.showLogin);
router.get('/registro',AuthController.showRegistro);
// router.get('/home', VerificarUsuarioLogado, AuthController.showHome);
router.get('/home', AuthController.showHome);
router.get('/login', AuthController.showLogin);
router.post('/login', AuthController.login);


module.exports = router;
