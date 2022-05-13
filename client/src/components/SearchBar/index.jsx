import { connect } from "react-redux";
import { useState } from "react";
import { getPokemonName,find } from "../../redux/actions";

function SearchBar( {getPokemonName,findAwait} ){

    function getPoke(e,name){
        e.preventDefault();
        if(name !==""){
            findAwait()
            getPokemonName(name.toLowerCase())
            document.getElementById("inputSearch").value="";
        }
    }

    const [name, setName] =useState("")

    return (
        <form style={{marginRight:"10px"}} className="form-inline" onSubmit={(e)=>getPoke(e,name)}>
                <input id="inputSearch" placeholder="Nombre" onChange={(e)=>setName(e.target.value)}/>
                <button style={{cursor:"pointer"}} type="submit">BuscarPokemon</button>
        </form>
    )
}

  function mapDispatchToProps(dispatch){
      
        return {
            getPokemonName :(name)=>dispatch(getPokemonName(name)),
            findAwait:()=>dispatch(find())
        }

  }
export default connect(null,mapDispatchToProps )(SearchBar);