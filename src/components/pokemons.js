import Pokemon from "./pokemon";
import './pokemons.css';

import PokeInfoPortal from '../portals/pokeInfoPortal';
import PokeInfo from "./pokeInfo";
import {useState} from 'react';

export default function({pokemons}){

    const [show, setShow] = useState(false);
    const [pokeId, setPokeId] = useState(null);

    const handleShowPokeInfo = function(pokeId){
        setShow(true);
        setPokeId(pokeId)
    }

    return <>
        <section>
            <div className="pokemons">
                { 
                    pokemons.map(({name, url, pokemon}) => {
                        name = name || pokemon.name;
                        url = url || pokemon.url;
                        
                        let pokemonId = url.split('/');
                        pokemonId = pokemonId[pokemonId.length - 2];

                        return <Pokemon key={"pokemon_"+pokemonId}
                                        name={name}
                                        url={url}
                                        pokemonId={pokemonId}
                                        showInfoPoke={handleShowPokeInfo}
                        />
                    })
                }
            </div>
        </section>


        <PokeInfoPortal
            show = {show}
            setShow={setShow}
        >
            <PokeInfo 
                pokemonId={pokeId}
            />
        </PokeInfoPortal>
    </>;

}