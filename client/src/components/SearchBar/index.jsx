import { connect } from "react-redux";
import { useState } from "react";
import { getPokemonName } from "../../redux/actions";

function SearchBar( {getPokemonName} ){

    function getPoke(e,name){
        e.preventDefault();
        getPokemonName(name) //ME TIRA QUE NO ES UNA FUNCION WTF
    }

    const [name, setName] =useState("")

    return (
        <form style={{marginRight:"10px"}} className="form-inline" onSubmit={(e)=>getPoke(e,name)}>
                <input placeholder="Nombre" onChange={(e)=>setName(e.target.value)}/>
                <button style={{cursor:"pointer"}} type="submit">BuscarPokemon</button>
        </form>
    )
}

  function mapDispatchToProps(dispatch){
      
        return {
            getPokemonName :(name)=>dispatch(getPokemonName(name))
        }

  }
export default connect(null,mapDispatchToProps )(SearchBar);