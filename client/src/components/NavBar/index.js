import Types from "../SelectTypes"
import SearchBar from "../SearchBar"
import PokemonsFrom from "../SelectPokemons/SelectFrom"
export default function Navbar(){
    return (

    <nav style={{display:"flex",flexDirection:"row" , justifyContent:"center", backgroundColor:"yellow"}}>
        <SearchBar/>
        <Types/>
        <PokemonsFrom/>
  
    </nav>

  )
}