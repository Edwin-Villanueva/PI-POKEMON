import { useState } from "react"
import { Link } from "react-router-dom";
function CreatePokemon(){
    const [data, setData] = useState({
        name:'',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        img1: '',
        types: []
    })
    function changeData(e) { 
        console.log(data);
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }

    return(
        <div>
            <form onSubmit={()=>console.log()} >
                <div>
                    <label>Name: </label>
                    <input type='text' value={data.name} name='name' placeholder='Name' onChange={(e)=>changeData(e)}  required />
                    {/* <span>{error}</span> */}
                </div>
                <div>
                    <label>Hp: </label>
                    <input type='number' value={data.hp} name='hp' placeholder='Hp'max="250" min="0" onChange={(e)=>changeData(e)} required />
                    <progress max="250" value={data.hp}></progress>
                    {/* <span>{error}</span> */}
                </div>
                <div>
                    <label>Attack: </label>
                    <input type='number' value={data.attack} name='attack' placeholder='Hp'max="250" min="0" onChange={(e)=>changeData(e)} required />
                    <progress max="250" value={data.attack}></progress>
                    {/* <span>{error}</span> */}
                </div>   
            </form>
            <Link to="/Home">
                <button>Volver</button>
            </Link>
        </div>
    )
}
export default CreatePokemon;