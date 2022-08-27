import {useState, Suspense} from 'react';
import PokeInfo from '../components/pokeInfo';
import PokeInfoPortal from '../portals/pokeInfoPortal';
import PokemonGroupName from '../components/pokemonGroupName';
import { wrapPromise } from '../helpers/helpers';
import { getPokemonTypes, getPokemonAbilities } from '../api/pokeapi';

import './aside.css'


const data = (() => {
    const pokemonTypesPromise = getPokemonTypes();
    const pokemonAbilitiesPromise = getPokemonAbilities();

    return {
        pokemonTypes: wrapPromise(pokemonTypesPromise),
        pokemonAbilities: wrapPromise(pokemonAbilitiesPromise)
    };

})();

export default function({setSearchBy}){
    const [show, setShow] = useState(false);
    const [inpPokemonId, setInpPokemonId] = useState('');
    const  [pokemonId, setPokemonId] = useState();


    const handlePokemonId = () => {
        setShow(true);
        setPokemonId(inpPokemonId); 
        setInpPokemonId('') 
    }

    return <>
    <aside className='aside'>
         <form className='aside-block' onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder='Search By Name' value={inpPokemonId} onChange={(e) => setInpPokemonId(e.target.value)} />
            <button onClick={handlePokemonId}></button>
         </form>
        <Suspense fallback={<>Loading types...</>}>
            <div className='aside-block'>
             <span>Pokemon Types</span>
                <PokemonGroupName
                    types = {data.pokemonTypes.read()}
                    handleOnClick = {(name)=> setSearchBy(name === -1 ? 'pokemon/' : `type/${name}`)}
                    keyName={'pokemon-type'}
                />
            </div>
        </Suspense>
        <Suspense fallback={<>Loading abilities...</>}>
            <div className='aside-block'>
                <span>Pokemon Abilities</span>
                <PokemonGroupName
                    types = {data.pokemonAbilities.read()}
                    handleOnClick = {(name)=> setSearchBy(name === -1 ? 'pokemon/' : `ability/${name}`)}
                    keyName={'pokemon-ability'}
                />
            </div>
        </Suspense>

    </aside>
    <PokeInfoPortal
            show = {show}
            setShow={setShow}
        >
            <PokeInfo 
                pokemonId={pokemonId}
            />
    </PokeInfoPortal>
    </>
}







