import Types from "../SelectTypes"
import SearchBar from "../SearchBar"
import PokemonsFrom from "../SelectPokemons/SelectFrom"
import Refresh from "../Refresh"
import OrderBy from "../OrderBy"
import ButtonCreate from "../ButtonCreate"
import ButtonLanding from "../ButtonLanding"
export default function Navbar(){
    return (

    <nav style={{display:"flex",flexDirection:"row" , justifyContent:"center", backgroundColor:"yellow"}}>
        <ButtonLanding/>
        <SearchBar/>
        <Types/>
        <PokemonsFrom/>
        <OrderBy/>
        <ButtonCreate/>
        <Refresh/>
    </nav>

  )
}