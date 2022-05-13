import Types from "../SelectTypes"
import SearchBar from "../SearchBar"
import PokemonsFrom from "../SelectPokemons/SelectFrom"
import Refresh from "../Refresh"
import OrderBy from "../OrderByName"
import OrderByAtack from "../OrderByAtack"
export default function Navbar(){
    return (

    <nav style={{display:"flex",flexDirection:"row" , justifyContent:"center", backgroundColor:"yellow"}}>
        <SearchBar/>
        <Types/>
        <PokemonsFrom/>
        <OrderBy/>
        <Refresh/>
    </nav>

  )
}