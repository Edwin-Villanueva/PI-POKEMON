import { useEffect } from "react";
import { getPokemonsFrom } from "../../redux/actions";
import { connect } from 'react-redux';


function PokemonsFrom({ getPokemonsFrom  }) {
    
    function getFrom(from){
        getPokemonsFrom(from)
    }
   
    return (
        <div style={{marginRight:"10px"}}>
            <span>From</span>
            <select onChange={(e)=>getFrom(e.target.value)}>
                <option value={"Todos"}>Todos</option>
                <option value={"API"}>Originales</option>
                <option value={"DB"}>CreadosPorMi</option>
            </select>
        </div>
        
    )
}


function mapDispatchToProps(dispatch){
    return {
        getPokemonsFrom :(value)=> dispatch(getPokemonsFrom(value)) //TENGPO
    }
}

export default connect(null,mapDispatchToProps)(PokemonsFrom);






