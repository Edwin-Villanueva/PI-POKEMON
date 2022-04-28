import Pokemon from "./pokemon";
import { useEffect } from "react";
import { getPokemons } from "../../redux/actions";
import { connect } from 'react-redux';


function Pokemons({ pokemons ,getPokemons}) {
   
    useEffect(()=>{
        getPokemons();
    },[])

    return (
        <div className="pokemonsPack"> 
                {
                    pokemons.map((pokemon)=>{
                        return  <Pokemon key={pokemon.id} {...pokemon}/>
                    })
                }

        </div>
    )
}

function mapStateToProps(state){
  return {
    pokemons : state.pokemons
  }
}

function mapDispatchToProps(dispatch){
    return {
        getPokemons :()=> dispatch(getPokemons())
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Pokemons);


