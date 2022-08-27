
import { useState, useEffect, useReducer } from "react";
import { pokeapiReducer } from "../services/redurcers/pokeapiReducer";
import { API_ACTIONS } from "../services/actions/apiActions";

const initialPokemons = {
    data: null,
    loading: true,
    error: false
}

const usePokeapi = function(pokemonsPerPage, page){
    const [pokemons, dispatch] = useReducer(pokeapiReducer, initialPokemons);
    const [searchBy, setSearchBy] = useState('pokemon/');
    const [searchParams, setSearchParams] = useState({
        offset: (page),
        limit: pokemonsPerPage
    });

    useEffect(function(){
        if(searchBy.trim().length == 0) setSearchBy('pokemon/');

        const getPokemons = () => {
            
           dispatch({type: API_ACTIONS.REQUEST});

           const params = new URLSearchParams(searchParams);
           const uri = `https://pokeapi.co/api/v2/${searchBy}?${params.toString()}`;

           fetch(uri).then(async res => {

               try{
                    let data = await res.json();
                    
                    if(searchBy !== 'pokemon/'){
                        data = {...data, results: data.pokemon, count: 0 };
                    }

                    dispatch({type:API_ACTIONS.SUCCESS, payload: data});
               }catch(e){
                    dispatch({type: API_ACTIONS.FAIL});
               }

           }).catch(err => {
                dispatch({type: API_ACTIONS.FAIL});
           }).finally(() => dispatch({type:API_ACTIONS.END_REQUEST}));  
             
        }

        getPokemons();

    }, [searchParams, page, searchBy]);

    return [pokemons, searchParams, setSearchParams, setSearchBy, dispatch];
}

export {usePokeapi};