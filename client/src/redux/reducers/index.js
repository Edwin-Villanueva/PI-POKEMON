import { act } from "@testing-library/react"
import {
    GET_POKEMONS ,
    GET_TYPES , 
    GET_FROM , 
    GET_POKEMON_NAME, 
    ERROR ,
    SET_PAGE, 
    CHANGE_TYPE,
    ORDER_BY_ATTACK,
    ORDER_BY_NAME,
    FIND
    } from "../actions/actionTypes"

const errorDefault={name:"",state:false}

const initialState = {
    currentType:"Todos",
    currentFrom:"Todos",
    pokemonsDB:[],
    pokemonsAPI:[],
    pokemons:[],
    pokemonsFilt:[],
    types:[],
    pokemonsRespaldo:[],
    error:errorDefault,
    page:1,
    find:false
}
const reducer=(state=initialState,action)=>{
    switch (action.type) {
        case FIND : return {...state,find:action.payload}
        case GET_POKEMONS:
            let pokesDB,pokesAPI;
            pokesDB= action.payload.filter((pokemon)=>{
                return (typeof pokemon.id === "string" )
            })
            pokesAPI= action.payload.filter((pokemon)=>{
                return (typeof pokemon.id === "number" )
             })
            
            return {
                ...state,pokemonsDB:pokesDB,pokemonsAPI:pokesAPI,
                pokemonsRespaldo:action.payload,error:errorDefault,pokemons:action.payload
            }
        case GET_TYPES:
            return {
                ...state,error:errorDefault,types:action.payload
            }
        
        case GET_FROM:{ 
                    let filter
                    switch (action.payload) {
                        
                        case "DB":
                            if(state.currentType === "Todos"){
                                filter=state.pokemonsDB
                            }
                            else{
                                filter = state.pokemonsDB.filter((pokemon)=>{
                                    if(pokemon.types !== undefined){
                                        return pokemon.types.includes(state.currentType)
                                    }
                                    else{
                                        return false;
                                    }
                                })
                            }
                            
                            return {...state,currentFrom:"DB",error:errorDefault,pokemons:filter,pokemonsFilt:filter}

                            
                        case "API":
                            if(state.currentType === "Todos"){
                                filter=state.pokemonsAPI
                            }
                            else{
                                filter = state.pokemonsAPI.filter((pokemon)=>{
                                    if(pokemon.types !== undefined){
                                        return pokemon.types.includes(state.currentType)
                                    }
                                    else{
                                        return false;
                                    }
                                })
                            }
                             
                            return {...state,currentFrom:"API",error:errorDefault,pokemons:filter,pokemonsFilt:filter}

                        default :{
                            if(state.currentType === "Todos"){
                                filter=state.pokemonsRespaldo
                            }
                            else{
                                filter = state.pokemonsRespaldo.filter((pokemon)=>{
                                    if(pokemon.types !== undefined){
                                        return pokemon.types.includes(state.currentType)
                                    }
                                    else{
                                        return false;
                                    }
                                })
                            }
                            
                            return {...state,currentFrom:"Todos",error:errorDefault,pokemons:filter,pokemonsFilt:filter}
                        }
                    }       

            }

        case GET_POKEMON_NAME : {
            return{...state,find:false,error:errorDefault,pokemons:action.payload}
        }
        case ERROR :{
            return{...state,error:action.payload}
        }

        case SET_PAGE:{
            return {...state,page:action.payload}
        }
        case CHANGE_TYPE :{
            let pokesAux;

            if(state.currentFrom === "API"){
                pokesAux=state.pokemonsAPI
            }
            else{
                if(state.currentFrom === "DB"){
                    pokesAux=state.pokemonsDB;
                }
                else{
                    pokesAux=state.pokemonsRespaldo
                }
            }

            
            let pageAux;
            if(state.page > 1){
                pageAux=1
            }
            else{
                pageAux=state.page;
            }
            let filter;
            if(action.payload !== "Todos"){
                filter = pokesAux.filter((pokemon)=>{
                    if(pokemon.types !== undefined){
                        return pokemon.types.includes(action.payload)
                    }
                    else{
                        return false;
                    }
                })
                return {...state,page:pageAux,currentType:action.payload,pokemons:filter,pokemonsFilt:filter}
            }
            else{

                return {...state,page:pageAux,currentType:"Todos",pokemons:pokesAux,pokemonsFilt:pokesAux};
            }
                
            
        }

        case ORDER_BY_NAME :{
            let pokemonsAux;
            if(state.currentType !== "Todos" || state.currentFrom !== "Todos"){
                pokemonsAux=[...state.pokemonsFilt]
            }
            else{
                pokemonsAux=[...state.pokemonsRespaldo]
            }

            let filter;

            if(action.payload === "1"){//ascendente
                filter=pokemonsAux.sort((poke1,poke2)=>{
                    if (poke1.name < poke2.name ) {return -1;}
                    if (poke1.name > poke2.name ) {return 1;}
                    return 0;
                })
                return {...state,pokemons:filter}
            }
            if(action.payload === "2"){//descendente
                filter=pokemonsAux.sort((poke1,poke2)=>{
                    if (poke1.name < poke2.name ) {return -1;}
                    if (poke1.name > poke2.name ) {return 1;}
                    return 0;
                })
                filter.reverse()
                return {...state,pokemons:filter}
            }

            return {...state, pokemons:pokemonsAux}

            
        }
        case ORDER_BY_ATTACK :{
            let pokemonsAux;
            if(state.currentType !== "Todos" || state.currentFrom !== "Todos"){
                pokemonsAux=[...state.pokemonsFilt]
            }
            else{
                pokemonsAux=[...state.pokemonsRespaldo]
            }

            let filter;

            if(action.payload === "1"){//ascendente
                pokemonsAux=pokemonsAux.filter((poke)=>{
                    return poke.attack !== undefined
                })
                filter=pokemonsAux.sort((poke1,poke2)=>{
                    if (poke1.attack < poke2.attack ) {return -1;}
                    if (poke1.attack > poke2.attack ) {return 1;}
                    return 0;
                })
                return {...state,pokemons:filter}
            }
            if(action.payload === "2"){//descendente
                pokemonsAux=pokemonsAux.filter((poke)=>{
                    return poke.attack !== undefined
                })
                filter=pokemonsAux.sort((poke1,poke2)=>{
                    if (poke1.attack < poke2.attack ) {return -1;}
                    if (poke1.attack > poke2.attack ) {return 1;}
                    return 0;
                })
                filter.reverse()
                return {...state,pokemons:filter}
            }

            return {...state, pokemons:pokemonsAux}

            
        }

        default: return state;
    }

}
export default reducer;