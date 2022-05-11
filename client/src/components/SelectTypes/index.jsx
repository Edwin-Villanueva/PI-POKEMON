import { useEffect } from "react";
import { getTypes ,changeType} from "../../redux/actions";
import { connect } from 'react-redux';


function Types({ types ,getTypes , changeType}) {
    function changeTypes(e){
        console.log(e);

    }

    useEffect(()=>{
        getTypes();
    },[])

    return (
        <div style={{marginRight:"10px"}}>
            <span>Tipos</span>
            <select onChange={(e)=>changeType(e.target.options[e.target.selectedIndex].text)} >
                <option value={0}>Todos</option>
                {types.map((type)=>{// opcion por defeault "TIPOS" 
                    return (
                        <option key={type.id} value={type.id}>{type.name} </option>
                    )
                })}
            </select>
        </div>
        
    )
}

function mapStateToProps(state){
  return {
    types : state.types
  }
}

function mapDispatchToProps(dispatch){
    return {
        getTypes :()=> dispatch(getTypes()),
        changeType :type=>dispatch(changeType(type)),
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Types);






