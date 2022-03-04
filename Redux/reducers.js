import {SET_USER_ID} from './actions';

const initialState ={
	id : '',
}


function userReducer(state =initialState, action){
	switch(action.type){
		case SET_USER_ID:
			return {...state, id:action.payload};
		default:
			return state;
	}
}

export default userReducer;