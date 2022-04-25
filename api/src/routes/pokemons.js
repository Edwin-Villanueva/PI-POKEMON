require('dotenv').config();
const { Router } = require('express');
const { Op } = require ("sequelize");
const axios = require("axios");
const { URL_API } = process.env;
const { Pokemon } = require("../db")
const router = Router();


      


router.get("/",async(req,res,next)=>{
   
let pokemonsAPI;
let pokemonsDB;
let pDB_filt;
const  { name } = req.query;
// const queryParamsSize=Object.keys(req.query).length;
try {
    
    if( name ){//si paso 2 parametros con la misma variable me genera un array de valores
       let lowerName= name.toLowerCase();
       pokemonsDB = (await Pokemon.findAll({
        where:{
            name:name //exactamente debe tener el mimso nombre
        },
        order:[
                ['name','ASC']
        ] //ORDERNAR POR NOMBRE ASCENDENTEMENTE
    }))
        try {
            
            
            let pokemonsAPI=await axios.get(`${URL_API}${name}`);
                pAPI=[{
                    name:pokemonsAPI.data.name,
                    id:pokemonsAPI.data.id
                }]

            res.send([...pAPI,...pokemonsDB]); //  junto las coincidencias de la api y la bd
        } catch (error) {

            
            if( pokemonsDB.length > 0){
                res.status(200).send([...pokemonsDB]); //  junto las coincidencias de la api y la bd
            }
            else{
                console.log("entre al primer catch")
                res.status(404).send({error:"Lo siento el pokemon que intentas buscar no se encuentra o no existe - error (404)"});
            }
  
        }

    }
    else{  
        pokemonsAPI=await axios.get(URL_API)     
        pokemonsDB = await Pokemon.findAll();
    
        Promise.all([pokemonsAPI,pokemonsDB])
            .then(async(response)=>{
                const [pAPI ,pDB] = response;
                
                let PokesPromises=pAPI.data.results.map((poke)=>{
                    return axios.get(poke.url)
                })
                // console.log(idPromesas);
                Promise.all(PokesPromises)
                .then(infoPoke=>{ 
                    let pAPI_filt =infoPoke.map((poke)=>{
                        return {
                            name : poke.data.name,//agarro el name desde la url del poke
                            id: poke.data.id//agarro el id desde la url del poke
                        }
                    })
                    
                    ////////////////////////////////////////////////////////////////

                    let pDB_filt =pDB.map((pokemon)=> { //puede haber mas de 1 propiedad pero solo mando 1
                        return {
                            name:pokemon.name,
                            id:pokemon.id
                        }
                    } );
                    let maxPokeApi=5;
                    let allPokemons=[...pDB_filt,...pAPI_filt.slice(0,maxPokeApi)];//filtro 5 dela api asi veo si se muestra de mi bd

                    let pokesOrd=allPokemons.sort(function (a, b) { //ordeno de menor a mayor SOLO para VISUALIZAR
                        if (a.name.toLowerCase() > b.name.toLowerCase()) {//luego tengo que filtrar desde el front
                        return 1;                             //enviando filtrados al back o filtrarlo alli SEGUN
                                                            //COMO SE QUIERA
                        }
                        if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        return -1;
                        }
                        return 0;
                    }) ;
                    res.send(pokesOrd); 
                    

                })
            })
            .catch((error)=>{
                next(error);
            })}
} catch (error) {
    next(error);
}
   
})

router.get("/:id", async(req,res,next)=>{   
    const { id } = req.params;

    try {

            const pokeDB = await Pokemon.findByPk(id)
            
            res.send(pokeDB)
  
        
    } catch (error) {
        try {
            let idControlado= Number(id)// si lo que me pasan por params es un string me va a dar NAN que no es un numero
                                        //por lo que tiraria un error mas abajo
            const pokeApi = await axios.get(`${URL_API}${idControlado}`)
            let pokeSend = {
                name:pokeApi.data.name,
                id:pokeApi.data.id
            }
            res.status(200).send(pokeSend);
            
        } catch (error) {
            res.status(404).send("el id ingresado no corresponde a ningun pokemon  - error 404")
        }
    }

    
})

router.post("/",async(req,res,next)=>{
    try {
        const { name } = req.body;
        const newPokemon= await Pokemon.create({
            name: name.toLowerCase()
        })
        res.status(201).send(newPokemon);
    } catch (error) {
        next(error);    
    }
})

router.put("/",(req,res,next)=>{
    res.send("soy el put de pokemons");
})

router.delete("/",(req,res,next)=>{
    res.send("soy el delete de pokemons");
})

module.exports = router;






// let pAPI_filt =pAPI.data.results.map(async(pokemon)=> {
//     let idPoke=await axios.get(pokemon.url).then(result=>{
//             return result;
//         })//guardo el id que esta dentro de la url
//     return {
        
//         name:pokemon.name,
//         id : idPoke.data.id
        
//     }
    
// } );
// let pDB_filt =pDB.map((pokemon)=> {
//     return {
//         id:pokemon.id,
//         name:pokemon.name
//     }
// } );

// if( name ){//segundo filtrado de nombre a buscar en caso que se haya proporcionado
//     pAPI_filt=pAPI_filt.filter((pokemon)=>{
//         return pokemon.name.toLowerCase().includes(name);

//     })
// }

// let maxPokeApi=5;
// let allPokemons=[...pDB_filt,...pAPI_filt.slice(0,maxPokeApi)];//filtro 5 dela api asi veo si se muestra de mi bd

// let pokesOrd=allPokemons.sort(function (a, b) { //ordeno de menor a mayor para testear
//     if (a.name.toLowerCase() > b.name.toLowerCase()) {//luego tengo que filtrar desde el front
//       return 1;                             //enviando filtrados al back o filtrarlo alli
//     }
//     if (a.name.toLowerCase() < b.name.toLowerCase()) {
//       return -1;
//     }
//     return 0;
//   }) ;
// if( name !== undefined ){
//     if( gamesOrd.length === 0 ){
//         res.send("Si no existe ningún pokemon mostrar un mensaje adecuado");
//     }
//     else{
//         res.send(gamesOrd.slice(0,10));//tener cuidado por si tira error
//     }

// }
// else{
//    res.send(pokesOrd); 
// }
