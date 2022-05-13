import styles from "./landing.module.css"
import { Link } from "react-router-dom"
export default function Landing(){
    return(
        <div className={styles.container}>
            <h2>Bienvenidos a PokemonAPP</h2>
            <Link to='/home'> 
                <button>ENTRAR</button>
            </Link>
            
        </div>
    )
}