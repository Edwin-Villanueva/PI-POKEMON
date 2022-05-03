import axios from "axios"
import { GET_POKEMONS , GET_TYPES , GET_FROM } from "./actionTypes"

export function getPokemons(){
    
    return async(dispatch)=>{
        let pokemons= await axios.get("http://localhost:3001/pokemons");
        dispatch({
            type:GET_POKEMONS,
            payload:pokemons.data
        })
    }
    
}

export function  getTypes(){
    return async(dispatch)=>{
        let types= await axios.get("http://localhost:3001/types");
        dispatch({
            type:GET_TYPES,
            payload:types.data
        })
    }
}

export function getPokemonsFrom(from){
    return({
        type:GET_FROM,
        payload:from
    })
    
}