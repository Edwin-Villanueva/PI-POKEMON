require('dotenv').config();
const { Router } = require('express');
const axios = require("axios");
const { URL_TYPE } = process.env;
const { Type } = require("../db")
const router = Router();

router.get("/",async(req,res,next)=>{
    let types = await axios.get(URL_TYPE);
    arrayTypesUrl= types.data.results.map((type)=>{
        return axios.get(type.url);

    })
    Promise.all(arrayTypesUrl)
    .then(resultado =>{

        typesFilt = resultado.map((type)=>{
            let nuevoType={
                name : type.data.name,
                id : type.data.id
            }
            return nuevoType;  
            
        })
        res.send(typesFilt);
    })
})
module.exports = router;