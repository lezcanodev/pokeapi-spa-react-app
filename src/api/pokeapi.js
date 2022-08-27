

async function getPokemonTypes(){
    const URI = 'https://pokeapi.co/api/v2/type/';
    let types = [];

    await fetch(URI).then( async res => {
        try{
            const data = await res.json();
            types = data;
        }catch(e){
            console.log(e)
        }
    });

    return types;

}

async function getPokemonAbilities(){
    const URI = 'https://pokeapi.co/api/v2/ability/';
    let abilities = [];

    await fetch(URI).then( async res => {
        try{
            const data = await res.json();
            abilities = data;
        }catch(e){
            console.log(e)
        }
    });

    return abilities;
}


export {getPokemonTypes, getPokemonAbilities}