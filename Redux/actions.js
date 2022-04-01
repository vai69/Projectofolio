import { firebase } from '../firebase/config'

export const SET_USER = 'SET_USER';
export const SET_PROJECTS = 'SET_PROJECTS';


export const setUser = id => dispatch => {
	dispatch({
		type: SET_USER,
		payload: id,
	});
};

export const setProjects = () => {
	return async dispatch => {
		const loadedProducts = [];
		const response = firebase.firestore()
			.collection('Projects')
			.get()
			.then(querySnapshot => {
				// console.log('Total users: ', querySnapshot.size);

				querySnapshot.forEach(documentSnapshot => {
					// console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
					let dt = documentSnapshot.data();
					loadedProducts.push(dt);
				});
			})
			dispatch({type : SET_PROJECTS, payload : loadedProducts});
	}
	
}
