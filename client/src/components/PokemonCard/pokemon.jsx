import styles from "./pokemon.module.css";

export default function Pokemon({name,id}){
    return( 
        <div id={id} className={styles.pokemonCard}>
           <p>{name}</p>
           <p>{id}</p>
        </div>
    )
}