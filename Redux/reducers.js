import {SET_USER} from './actions';
import {SET_PROJECTS} from './actions';
const initialState ={
	user : {},
	projects : [],
}


function userReducer(state =initialState, action){
	switch(action.type){
		case SET_USER:
			return {...state, user:action.payload};
		case SET_PROJECTS:
			return {...state, projects:action.payload};
		default:
			return state;
	}
}

export default userReducer;