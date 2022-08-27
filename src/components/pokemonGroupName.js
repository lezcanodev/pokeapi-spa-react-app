import './pokemonGroupName.css';

export default function({types, keyName, handleOnClick}){

    return <div className='pokemon-group-names'> 
            <div className='pokemon-name' onClick={() => handleOnClick(-1)} >All</div>
            {types.results.map(({name}, index)=> {
                return <div className='pokemon-name' onClick={() => handleOnClick(name)} key={keyName+index} >{name}</div>;
            })}
         </div>;
}