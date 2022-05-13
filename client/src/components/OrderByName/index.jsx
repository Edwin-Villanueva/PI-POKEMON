import { connect , } from "react-redux"
import {orderByAttack, orderByName} from "../../redux/actions"
function OrderBy({orderByName,orderByAttack}){
    function orderBN(e){
        orderByName(e.target.value);
        document.getElementById("byAttack").selectedIndex=0;
        //no modificar sino seguir con lo demas

    }
    function orderBA(e){
        orderByAttack(e.target.value);
        document.getElementById("byName").selectedIndex=0;
    }
    //falta poner para ordenar si cambia 
    return(
        <div style={{display:"flex"}}>
            <div>
            <span>OrdenarPorNombre</span>
            <select id="byName" onChange={(e)=>orderBN(e)}>
                <option value="0">seleccionar</option>
                <option value="1">ascendente-AZ</option>
                <option value="2">descendente-ZA</option>
            </select>
        </div>
        <div>
            <span>OrdenarPorAtaque</span>
            <select id="byAttack" onChange={(e)=>orderBA(e)}>
                <option value="0">seleccionar</option>
                <option value="1">ascendente</option>
                <option value="2">descendente</option>
            </select>
            </div>
        </div>
    )
}
  
  function mapDispatchToProps(dispatch){
      return {
           orderByName:order => dispatch(orderByName(order)),
           orderByAttack:order =>dispatch(orderByAttack(order))
      }
  } 

export default connect(null,mapDispatchToProps)(OrderBy)