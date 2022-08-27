import './pokeInfo.css';
import { usePokeInfo } from '../hooks/pokeInfo';
import {useEffect, useContext} from 'react';
import Loading from './loading';
import { CapturePokemonsContext } from '../App';

export default function({pokemonId}){
   const {capturePokemons, setCapturePokemons} = useContext(CapturePokemonsContext);
   const captured = typeof capturePokemons.find(({id}) => pokemonId === id ) !== 'undefined';
   const  [pokeInfo, setPokeId] = usePokeInfo();
   
   useEffect(() => {
    pokeInfo.error = false;
    setPokeId(pokemonId); 
   }, [pokemonId]);
   
   if(pokeInfo.loading) return <Loading />;
   if(pokeInfo.error) return <>Not found!!</>;
   if(Object.keys(pokeInfo.data).length === 0) return;

   const {baseInformation, specie, locationArea} = pokeInfo.data;

   const maxExperience = 345;
   const experiencePercent = (baseInformation.base_experience/maxExperience)*100;
   const pokeColor = specie.color.name;
   
   const sprites = [];
   const {back_default,
          back_female,
          back_shiny,
          back_shiny_female,
          front_default,
          front_female,
          front_shiny,
          front_shiny_female } = baseInformation.sprites;

    if(back_default !== null)       sprites.push(<img key="back_default" src={back_default} />);
    if(back_female !== null)        sprites.push(<img key="back_female" src={back_female} />);
    if(back_shiny !== null)         sprites.push(<img key="back_shiny" src={back_shiny} />);
    if(back_shiny_female !== null)  sprites.push(<img key="back_shiny_female" src={back_shiny_female} />);
    if(front_default !== null)      sprites.push(<img key="front_default" src={front_default} />);
    if(front_female !== null)       sprites.push(<img key="front_female" src={front_female} />);
    if(front_shiny !== null)        sprites.push(<img key="front_shiny" src={front_shiny} />);
    if(front_shiny_female !== null) sprites.push(<img key="front_shiny_female" src={front_shiny_female} />);

    

    const handleSetCapturePokemons = (pokemon) => { 
        if(captured) return;
        setCapturePokemons([...capturePokemons, pokemon]);
    }

   return <div className='pokeinfo'>
        <div className='pokeinfo-header' >
                <div className='pokeinfo-img' style={{backgroundColor: pokeColor}}>
                    <img src={baseInformation.sprites.front_default} alt=''/>
                </div>
                <div className='pokeinfo-basic'>
                    <h3>{baseInformation.name}</h3>
                    <div className='pokeinfo-experience'>
                        <p>Base Experience</p>
                        <div className='pokeinfo-progressbar'>
                            <div className='pokeinfo-progress' style={{width: experiencePercent+'%' ,backgroundColor: pokeColor}}></div>
                        </div>   
                    </div>
                    <div className={`pokeinfo-capture ${captured ? 'pokeinfo-captured' : ''}`}>
                            <button onClick={() =>(
                                 handleSetCapturePokemons({id:pokemonId,
                                                           name: baseInformation.name,
                                                           color: pokeColor,
                                                           sprite: baseInformation.sprites.front_default })
                                 )}>Capture</button>
                    </div>
                </div>
        </div>
        <div className='pokeinfo-content'>

            <div className='pokeinfo-block' style={{borderColor: pokeColor}}>
                <h4 className='pokeinfo-block-title' style={{borderColor: pokeColor}}>Personal</h4>
                <div className='pokeinfo-block-content' >
                    <ul className='pokeinfo-group'>
                        <li className='pokeinfo-group-item'> <span>Height</span>       <span>{baseInformation.height}</span> </li>
                        <li className='pokeinfo-group-item'> <span>Weight</span>       <span>{baseInformation.weight} </span> </li>
                        <li className='pokeinfo-group-item'> <span>Capture Rate</span> <span>{specie.capture_rate} </span> </li>
                        <li className='pokeinfo-group-item'> <span>Types</span> 
                            <div className='pokeinfo-tags'>
                                {
                                    baseInformation.types.map(({type}, index) => (
                                        <span className='pokeinfo-tag' key={`pokeinfo-types-${index}`}>{type.name}</span>
                                    ))
                                }
                            </div>
                        </li>

                    </ul>
                </div>
            </div>

            <div className='pokeinfo-block' style={{borderColor: pokeColor}}>
                <h4 className='pokeinfo-block-title' style={{borderColor: pokeColor}}>Abilities</h4>
                <div className='pokeinfo-block-content pokeinfo-tags'>
                    {
                        baseInformation.abilities.map(({ability}, index) => (
                            <span className='pokeinfo-tag' key={`pokeinfo-ability-${index}`}>{ability.name}</span>
                        ))
                    }
                </div>
            </div>
            
            <div className='pokeinfo-block' style={{borderColor: pokeColor}}>
                <h4 className='pokeinfo-block-title' style={{borderColor: pokeColor}}>Sprites</h4>
                <div className='pokeinfo-block-content pokeinfo-pictures' >
                   {sprites}
                </div>
            </div>

            <div className='pokeinfo-block' style={{borderColor: pokeColor}}>
                <h4 className='pokeinfo-block-title' style={{borderColor: pokeColor}}>location area</h4>
                <div className='pokeinfo-block-content pokeinfo-tags' >
                   {
                        locationArea.map(({location_area}, index) => (
                            <span className='pokeinfo-tag' key={`pokeinfo-location-area-${index}`}>{location_area.name}</span>
                        ))
                   }
                </div>
            </div>

        </div>
     
    </div>;
}