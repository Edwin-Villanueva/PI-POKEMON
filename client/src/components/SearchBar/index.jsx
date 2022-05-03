export default function SearchBar(){
    return (
        <form style={{marginRight:"10px"}} className="form-inline">
                <input placeholder="Nombre" />
                <button style={{cursor:"pointer"}} type="submit">BuscarPokemon</button>
        </form>
    )
}