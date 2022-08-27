import { useReducer, useState, useEffect } from "react"
import {pokeInfoReducer} from "../services/redurcers/pokeInfoReducer";
import { API_ACTIONS } from "../services/actions/apiActions";
import {pokemonSpecie, pokemonLocationArea}  from '../helpers/helpers';

const initialState = {
    data: {},
    loading: false,
    error: false
}

const usePokeInfo = function(){
    
    const [pokeId, setPokeId] = useState();
    const [pokeInfo, dispatch]= useReducer(pokeInfoReducer, initialState);

    useEffect(function(){
        const getIinfo = () => {
            if(typeof pokeId === 'undefined' || pokeId == null) return;

            dispatch({type: API_ACTIONS.REQUEST});

            const uri = 'https://pokeapi.co/api/v2/pokemon/'+pokeId; 
            
            fetch(uri).then(async res => {

                try{
                    const baseInformationPromise = res.json();
                    const speciePromise =  pokemonSpecie(pokeId);
                    const locationAreaPromise =  pokemonLocationArea(pokeId);

                    const [baseInformation, specie, locationArea] = await Promise.all([baseInformationPromise, speciePromise, locationAreaPromise]);

                    dispatch({type: API_ACTIONS.SUCCESS, payload: {
                        baseInformation,
                        specie,
                        locationArea
                    }});

                }catch(e){
                    dispatch({type: API_ACTIONS.FAIL});
                }


            }).finally(() =>   dispatch({type: API_ACTIONS.END_REQUEST}));
        }

        getIinfo();

    }, [pokeId]);

    return [pokeInfo, setPokeId, pokeId];
}

export {usePokeInfo};