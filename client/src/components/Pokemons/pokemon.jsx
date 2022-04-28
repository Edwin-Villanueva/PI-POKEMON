export default function Pokemon({name,id}){
    return( 
        <div id={id} className="pokemonCard">
           <p>{name}</p>
           <p>{id}</p>
        </div>
    )
}