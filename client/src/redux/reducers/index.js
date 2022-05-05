import { GET_POKEMONS , GET_TYPES , GET_FROM , GET_POKEMON_NAME, ERROR } from "../actions/actionTypes"
const errorDefault={name:"",state:false}
const initialState = {
    pokemons:[],
    types:[],
    pokemonsRespaldo:[],
    error:errorDefault
}
const reducer=(state=initialState,action)=>{
    switch (action.type) {
        case GET_POKEMONS:
            
            return {
                ...state,pokemonsRespaldo:action.payload,error:errorDefault,pokemons:action.payload
            }
        case GET_TYPES:
            return {
                ...state,error:errorDefault,types:action.payload
            }
        
        case GET_FROM:{ 
                    let filter
                    switch (action.payload) {
                        
                        case "DB": 
                            filter= state.pokemonsRespaldo.filter((pokemon)=>{
                                return (typeof pokemon.id === "string" )
                            })
                            return {...state,error:errorDefault,pokemons:filter}

                            
                        case "API":
                            filter= state.pokemonsRespaldo.filter((pokemon)=>{
                                return (typeof pokemon.id === "number" )
                             })
                            return {...state,error:errorDefault,pokemons:filter}
                        default :return {...state,error:errorDefault,pokemons:state.pokemonsRespaldo}
                    }       

            }

            case GET_POKEMON_NAME : {
                return{...state,error:errorDefault,pokemons:action.payload}
            }
            case ERROR :{
                return{...state,error:action.payload}
            }

        default: return state;
    }

}
export default reducer;