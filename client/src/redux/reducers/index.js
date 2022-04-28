import { GET_POKEMONS } from "../actions/actionTypes"
const initialState = {
    pokemons:[],
}
const reducer=(state=initialState,action)=>{
    switch (action.type) {
        case GET_POKEMONS:
            
            return {
                ...state,pokemons:action.payload
            }
    
        default: return state;
    }

}
export default reducer;