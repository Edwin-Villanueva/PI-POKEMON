import Pokemons from "./components/PokemonsPack";
import Navbar from "./components/NavBar";
import Pagination from "./components/Pagination";
import Landing from "./components/LandingPage";
import { Route } from "react-router-dom";
import CreatePokemon from "./components/CreatePokemon";
function App() {
  return (
    <>
      <Route path="/" exact>
        <Landing/>
      </Route>
      <Route path="/home" exact>
        <Navbar/>
        <Pagination/>
        <Pokemons/>
        <Pagination/>
      </Route>
      <Route path="/Create">
          <CreatePokemon/>
      </Route>
    </>
  );
}

export default App;
