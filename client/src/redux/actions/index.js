import axios from "axios"
import { 
    SET_PAGE,
    GET_POKEMONS ,
    GET_TYPES ,
    GET_FROM ,
    GET_POKEMON_NAME ,
    ERROR,
    CHANGE_TYPE,
    ORDER_BY_NAME,
    ORDER_BY_ATTACK
    } from "./actionTypes"

export function orderByName(order){
    console.log(order);
    return({
        type:ORDER_BY_NAME,
        payload:order
    })
}
export function orderByAttack(order){
    return({
        type:ORDER_BY_ATTACK,
        payload:order
    })
}

export function changeType(type){
    return({
        type:CHANGE_TYPE,
        payload:type
    })
}    

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

export function getPokemonName(name){
    return async (dispatch)=> {
        try {
            let poke = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
            dispatch({
                type: GET_POKEMON_NAME,
                payload: poke.data
            });
        } catch (error) {
            let errorMod={name:error.response.data.error,state:true}
            dispatch({
                type:ERROR,
                payload:errorMod
            })
        }
    }
}

export function setPage(page){
    return ({
      type: SET_PAGE,
      payload: page, 
    })
}