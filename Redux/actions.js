export const SET_USER_ID ='SET_USER_ID';



export const setID = id =>dispatch =>{
	dispatch({
		type: SET_USER_ID,
		payload:id,
	})
};