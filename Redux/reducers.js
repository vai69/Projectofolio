import {SET_USER} from './actions';
import {SET_PROJECTS} from './actions';
import {FIL_PROJECTS} from './actions';
const initialState ={
	user : {},
	projects : [],
	filters : [],
}


function userReducer(state =initialState, action){
	switch(action.type){
		case SET_USER:
			return {...state, user:action.payload};
		case SET_PROJECTS:
			return {...state, projects:action.payload};
		case FIL_PROJECTS:
			return {...state, filters:action.payload};
		
		default:
			return state;
	}
}

export default userReducer;