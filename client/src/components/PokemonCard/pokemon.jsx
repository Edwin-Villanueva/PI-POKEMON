import styles from "./pokemon.module.css";

export default function Pokemon({id,name,img1,img2,gif,types}){
    return( 
        <div id={id} className={styles.pokemonCard}>
           <p>{name}</p>
           <img src={img2} alt=" no disponible" />
           <p>{
           types !==undefined?
            types.join("  /  ")
           :""
           
           }</p>
        </div>
    )
}