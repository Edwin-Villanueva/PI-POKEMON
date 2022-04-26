const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const pokemons = require('./pokemons');
const types = require('./types');
const router = Router();

router.get('/',(req,res)=>{
    res.send("soy / jaja")
})
router.use("/pokemons",pokemons);
router.use("/types",types);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
