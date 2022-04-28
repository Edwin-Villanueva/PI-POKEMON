import axios from "axios"
import { GET_POKEMONS } from "./actionTypes"

export function getPokemons(){
    
    return async(dispatch)=>{
        let pokemons= await axios.get("http://localhost:3001/pokemons");
        dispatch({
            type:GET_POKEMONS,
            payload:pokemons.data
        })
    }
    
}