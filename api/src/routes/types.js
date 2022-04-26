require('dotenv').config();
const { Router } = require('express');
const axios = require("axios");
const { URL_TYPE } = process.env;
const { Type } = require("../db")
const router = Router();


router.get("/",async(req,res,next)=>{
    try {
        let typesDB= await Type.findAll()
        if(typesDB.length !== 0){
            console.log("entre al if")
            res.send(typesDB);
        }
        else{
            try {
                let types = await axios.get(URL_TYPE);
                arrayTypesUrl= types.data.results.map((type)=>{
                    return axios.get(type.url);
                })
                Promise.all(arrayTypesUrl)
                .then(resultado =>{
        
                    typesFilt = resultado.map((type)=>{
                        let nuevoType={
                            name : type.data.name.toLowerCase(),
                            id : type.data.id
                        }
                        return nuevoType;  
                        
                    });
                    console.log("entre al else");
                    typesFilt.forEach(async(type) => {
                        await Type.create({
                            type// si esto tira error desglosar el tipe en name y en id
                        })
                    });
                    res.send(typesFilt);
                })
                
            } catch (error) {
                res.send(error);
            }

        }
        
    } catch (error) {
        res.send("error en DB");
    }
    
})
module.exports = router;