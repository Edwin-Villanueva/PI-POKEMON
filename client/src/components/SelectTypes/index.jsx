import { useEffect } from "react";
import { getTypes } from "../../redux/actions";
import { connect } from 'react-redux';


function Types({ types ,getTypes}) {
   
    useEffect(()=>{
        getTypes();
    },[])

    return (
        <div style={{marginRight:"10px"}}>
            <span>Tipos</span>
            <select onChange={()=>{(console.log("hola"))}} >
                <option>Todos</option>
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
        getTypes :()=> dispatch(getTypes())
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Types);






