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
        try {

            // si quiero buscar en la api
                // pokemonsAPI=await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                // pAPI=[{
                //     name:pokemonsAPI.data.name,
                //     id:pokemonsAPI.data.id
                // }]
            ///
            pokemonsDB = (await Pokemon.findAll({
                where:{
                    name:name //exactamente debe tener el mimso nombre
                },
                order:[
                        ['name','ASC']
                ] //ORDERNAR POR NOMBRE ASCENDENTEMENTE
            }))

            
            
            // res.send([...pAPI,...pokemonsDB]); //  junto las coincidencias de la api y la bd 
            res.send([...pokemonsDB]); 
        } catch (error) {
            console.log("entre al primer catch")
            res.status(404).send({error:"Lo siento el pokemon que intentas buscar no se encuentra o no existe - error (404)"});

  
        }

        // Promise.all(pokemonsDB)
        // .then(async(response)=>{
        //     const pDB = response;
        //         res.send(pAPI);

            
        // })
        // .catch((error)=>{
        //     next(error)
        //     })




    }
    else{  
        pokemonsAPI=await axios.get(URL_API)     
        pokemonsDB = await Pokemon.findAll();
    
        Promise.all([pokemonsAPI,pokemonsDB])
            .then(async(response)=>{
                const [pAPI ,pDB] = response;
                
                let idPromesas=pAPI.data.results.map((poke)=>{
                    return axios.get(poke.url)
                })
                // console.log(idPromesas);
                Promise.all(idPromesas).then(result=>{
                    let pAPI_filt = result.map((poke,index)=>{
                        return {
                            name : pAPI.data.results[index].name,
                            id: poke.data.id
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

router.post("/",async(req,res,next)=>{
    try {
        const { name } = req.body;
        const newPokemon= await Pokemon.create({
            name: name
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
