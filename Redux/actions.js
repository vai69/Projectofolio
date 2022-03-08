export const SET_USER='SET_USER';



export const setUser = id =>dispatch =>{
	dispatch({
		type: SET_USER,
		payload:id,
	})
};