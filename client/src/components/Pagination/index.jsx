import styles from "./paginacion.module.css"
import { connect } from "react-redux"
import { setPage } from "../../redux/actions"

export const pokeForPage=12;
function Pagination({page,pokemons,setPage}){
    
    const pagesMax = Math.ceil(pokemons.length /pokeForPage); 
    function nextPage(e){
        setPage(page+1)
    }
    function previousPage(e){
        setPage(page-1)
    }
 
    function createButtons(){
        let buttons=[]
        for (let index = 1; index <= pagesMax; index++) {
            buttons.push(<button key={index} onClick={(e)=>setPage(Number(e.target.innerText))}>{index}</button>)
            
        }
        return buttons;
    }


    return (
        <div className={styles.pageContainer}>
            <button id="previous" disabled={page===1} onClick={(e)=>previousPage(e)}>{"◀"}</button>
            <div>

                {
                createButtons()
                }

            </div>
                
            <button id="next" disabled={page===pagesMax} onClick={(e)=>nextPage(e)}>{"▶"}</button>
        </div>)
}

function mapStateToProps(state){
    return {
        page: state.page,
        pokemons:state.pokemons
    }
}
function mapDispatchToProps(dispatch){
    return{
        setPage:(page)=>dispatch(setPage(page))
    }
}


export default connect(mapStateToProps,mapDispatchToProps) (Pagination)