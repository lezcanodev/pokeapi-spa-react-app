import {useState} from 'react';


import './pokemonCaptured.css';

export default function({capturePokemons, handleSetPokeId}){

    return <>
        <div className="captured-pokemons">
            {capturePokemons.map(({id,name,color,sprite}) => (
                <div className="captured-pokemon" key={'pokemon-captured-'+id}>
                    <div className="captured-pokemon-sprite" style={{backgroundColor:color}}>
                        <img src={sprite}/>
                    </div>
                    <div className="captured-pokemon-info">
                        <h3 className='pokemon-name' onClick={() => handleSetPokeId(id)}>{name}</h3>
                    </div>
                </div>
            ))}
            
        </div>


    </>;
}