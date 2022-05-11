import Pokemon from "../PokemonCard/pokemon";
import { useEffect } from "react";
import { getPokemons } from "../../redux/actions";
import { connect } from 'react-redux';
import styles from "./pokemonsPack.module.css"
import { pokeForPage } from "../Pagination"


function Pokemons({ page,pokemons,currentFrom,currentType,getPokemons ,error}) {

    useEffect(()=>{
        getPokemons();
    },[])

    return error.state?
        <div className={styles.pokemonsPack}>
            {
                <h2>{error.name}</h2>
            }

        </div>
    
    :pokemons.length === 0 && currentFrom==="Todos" && currentType==="Todos"?
        <div className ={styles.pokemonsPack}>
            <h2>{"CARGANDO POKEMONS..."}</h2>
        </div>   
    :pokemons.length === 0 && (currentFrom!=="Todos" || currentType!=="Todos")?
        <div className ={styles.pokemonsPack}>
            <h2>{"Lo siento no hay pokemons"}</h2>
        </div>
    :(
        <div className={styles.pokemonsPack}>
                {
                    pokemons
                    .slice((page-1)* pokeForPage    ,      (page-1) * pokeForPage + pokeForPage )
                    .map((pokemon,i)=>{
                        return  <Pokemon key={pokemon.id} {...pokemon}/>
                    })
                }
        </div>
    )   ;
}

function mapStateToProps(state){
  return {
    pokemons : state.pokemons,
    error : state.error,
    page : state.page,
    currentType:state.currentType,
    currentFrom:state.currentFrom,
  }
}

function mapDispatchToProps(dispatch){
    return {
        getPokemons :()=> dispatch(getPokemons())
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Pokemons);


