import Pokemon from "../PokemonCard/pokemon";
import { useEffect } from "react";
import { getPokemons } from "../../redux/actions";
import { connect } from 'react-redux';
import styles from "./pokemonsPack.module.css"


function Pokemons({ pokemons ,getPokemons ,error}) {
   
    useEffect(()=>{
        getPokemons();
    },[])

    return error.state?
        <div className={styles.pokemonsPack}>
            {
                <h2>{error.name}</h2>
            }

        </div>
    
    :(
        <div className={styles.pokemonsPack}>
                {
                    pokemons.map((pokemon)=>{
                        return  <Pokemon key={pokemon.id} {...pokemon}/>
                    })
                }

        </div>
    )   ;
}

function mapStateToProps(state){
  return {
    pokemons : state.pokemons,
    error : state.error

  }
}

function mapDispatchToProps(dispatch){
    return {
        getPokemons :()=> dispatch(getPokemons())
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Pokemons);


