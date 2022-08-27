import {useState, useEffect} from 'react'
import './pokemon.css';
import Loading from './loading';



export default function({pokemonId, name, url, showInfoPoke}){

    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;
    const [loading, setLoading] = useState(true);
    const [color, setColor] = useState('#fff');

    useEffect(function(){
   
        const getColor = function(){
            const URI = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`;

            fetch(URI).then(async res => {
                try{
                    const colorInfo = await res.json();
                    setColor(colorInfo.color.name);
                }catch(e){
                 
                }
            }).finally(() => setLoading(false));

        }

        getColor();

    }, []);

    if(loading){
        return <div className='pokemon'>
                    <div className='pokemon-img'>
                            <Loading />
                    </div>
                    <div className='pokemon-name'>
                            
                    </div>
                </div>; 
    }


    return <div className='pokemon' style={{'border':'1px solid '+color}}>
        <div className='pokemon-img'>
            <img src={image} className='img' />
        </div>
        <div className='pokemon-name' style={{'border':'1px solid '+color}} onClick={()=>showInfoPoke(pokemonId)}>
           <h3>{name}</h3>
        </div>
    </div>;
}