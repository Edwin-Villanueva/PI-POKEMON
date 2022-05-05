import { getPokemonsFrom } from "../../redux/actions";
import { connect } from 'react-redux';


function PokemonsFrom({ getPokemonsFrom  }) {
    
    return (
        <div style={{marginRight:"10px"}}>
            <span>De</span>
            <select onChange={(e)=>getPokemonsFrom(e.target.value)}>
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






