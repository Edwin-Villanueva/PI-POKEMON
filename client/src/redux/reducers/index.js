import { GET_POKEMONS , GET_TYPES , GET_FROM , GET_POKEMON_NAME, ERROR ,SET_PAGE, CHANGE_TYPE} from "../actions/actionTypes"
const errorDefault={name:"",state:false}
const initialState = {
    currentType:"Todos",
    currentFrom:"Todos",
    pokemonsDB:[],
    pokemonsAPI:[],
    pokemons:[],
    types:[],
    pokemonsRespaldo:[],
    error:errorDefault,
    page:1,
}
const reducer=(state=initialState,action)=>{
    switch (action.type) {
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
                            
                            return {...state,currentFrom:"DB",error:errorDefault,pokemons:filter}

                            
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
                             
                            return {...state,currentFrom:"API",error:errorDefault,pokemons:filter}

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
                            
                            return {...state,currentFrom:"Todos",error:errorDefault,pokemons:filter}
                        }
                    }       

            }

        case GET_POKEMON_NAME : {
            return{...state,error:errorDefault,pokemons:action.payload}
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
                return {...state,page:pageAux,currentType:action.payload,pokemons:filter}
            }
            else{

                return {...state,page:pageAux,currentType:"Todos",pokemons:pokesAux};
            }
                
            
        }

        default: return state;
    }

}
export default reducer;