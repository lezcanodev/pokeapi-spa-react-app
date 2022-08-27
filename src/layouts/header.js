import {useContext, useState} from 'react';
import { CapturePokemonsContext } from '../App';
import PokeInfoPortal from '../portals/pokeInfoPortal';
import PokemonCaptured from '../components/pokemonCaptured';
import PokeInfo from '../components/pokeInfo';

import './header.css';

export default function({}){
    const {capturePokemons, setCapturePokemons} = useContext(CapturePokemonsContext);
    const [show, setShow] = useState(false);
    const [pokeId, setPokeId] = useState();
    const [showPokemon, setShowPokemon] = useState(false);


    const handleShowPokemonsCaptured = () => {
        setShow(true);
    }

    const handleSetPokeId = (id) => {
        setShowPokemon(true);
        setShow(false);
        setPokeId(id);
    }

    return <>
        <header className='header'>
            <button className='your-pokemons' onClick={handleShowPokemonsCaptured}>
                Your pokemons <span>{capturePokemons.length}</span>
            </button>
        </header>
        
        <PokeInfoPortal
            show = {showPokemon}
            setShow={setShowPokemon}
        >
            <PokeInfo 
                pokemonId={pokeId}
            />
        </PokeInfoPortal>

        <PokeInfoPortal
            show = {show}
            setShow = {setShow}
        >
            <PokemonCaptured
                capturePokemons = {capturePokemons}
                handleSetPokeId = {handleSetPokeId}
            />
        </PokeInfoPortal>
    </>
}

