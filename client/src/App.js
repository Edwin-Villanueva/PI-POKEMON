import Pokemons from "./components/PokemonsPack";
import Navbar from "./components/NavBar";
import Pagination from "./components/Pagination";
function App() {
  return (
    <>
      <Navbar/>
      <Pagination/>
      <Pokemons/>
      <Pagination/>
    </>
  );
}

export default App;
