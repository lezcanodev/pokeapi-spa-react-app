import {API_ACTIONS} from '../actions/apiActions';

export const pokeapiReducer = (state, action) => {
    
    switch(action.type){
        case API_ACTIONS.REQUEST:
       
            return  {...state, loading:true};
        break;
        case API_ACTIONS.SUCCESS:
            return  { ...state, loading:true,  data: action.payload };
        break;
        case API_ACTIONS.FAIL:
            return  { ...state, error: true};
        break;
        case API_ACTIONS.END_REQUEST: 

            return  { ...state, loading:false };
        break;
    }

    return  { ...state, error: true};
}