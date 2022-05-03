import { act } from "@testing-library/react"
import { GET_POKEMONS , GET_TYPES , GET_FROM } from "../actions/actionTypes"
const initialState = {
    pokemons:[],
    types:[],
    pokemonsRespaldo:[],
}
const reducer=(state=initialState,action)=>{
    switch (action.type) {
        case GET_POKEMONS:
            
            return {
                ...state,pokemonsRespaldo:action.payload,pokemons:action.payload
            }
        case GET_TYPES:
            return {
                ...state,types:action.payload
            }
        
        case GET_FROM:{ 
                    let filter
                    switch (action.payload) {
                        
                        case "DB": 
                            filter= state.pokemonsRespaldo.filter((pokemon)=>{
                                return (typeof pokemon.id === "string" )
                            })
                            return {...state,pokemons:filter}

                            
                        case "API":
                            filter= state.pokemonsRespaldo.filter((pokemon)=>{
                                return (typeof pokemon.id === "number" )
                             })
                            return {...state,pokemons:filter}
                        default :return {...state,pokemons:state.pokemonsRespaldo}
                    }       

            }

        default: return state;
    }

}
export default reducer;