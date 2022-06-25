// inporting Firebse

import { firebase } from '../firebase/config'
import {useSelector} from 'react-redux'


export const SET_USER = 'SET_USER';
export const SET_PROJECTS = 'SET_PROJECTS';
export const FIL_PROJECTS = 'FIL_PROJECTS';
export const PROJECT_QUE = 'PROJECT_QUE';

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
			.collection('ApprovedProjects')
			.get()
			.then(querySnapshot => {
				// console.log('Total users: ', querySnapshot.size);

				querySnapshot.forEach(documentSnapshot => {
					// console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
					let dt = documentSnapshot.data();
					loadedProducts.push(dt);
				});
			})
		// const filters = loadedProducts;
			dispatch({type : SET_PROJECTS, payload : loadedProducts});
			dispatch({type : FIL_PROJECTS, payload : loadedProducts});
	}
	
}

export const setQued = () => {
	return async dispatch => {
		const loaded = [];
		const response = firebase.firestore()
			.collection('Projects')
			.get()
			.then(querySnapshot => {
				// console.log('Total users: ', querySnapshot.size);

				querySnapshot.forEach(documentSnapshot => {
					// console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
					let dt = documentSnapshot.data();
					loaded.push(dt);
				});
			})
			dispatch({type : PROJECT_QUE, payload : loaded});
			
	}
	
}

export const fil_pro = (batch,guide,domain) => {
	return async dispatch=>{
		const {projects} = useSelector(state=>state.userReducer);

		if(batch === '' && guide === '' && domain === ''){
			dispatch({type : SET_PROJECTS, payload : projects});
        }
        else if(batch && guide && domain){
            const fl = projects.filter(p=>{
                return p.batch === batch && p.Guide === guide && p.Domain === domain;
            })
            dispatch({type : FIL_PROJECTS, payload : loadedProducts});
        }
        else if(batch && guide)
        {
            const fl = projects.filter(p=>{
                return p.batch === batch && p.Guide === guide;
            })
            dispatch({type : FIL_PROJECTS, payload : loadedProducts});
            console.log(fl);
        }
        else if(batch&& guide==="" && domain==="")
        {
            const fl = projects.filter(p=>{
                return p.batch === batch;
            })
            dispatch({type : FIL_PROJECTS, payload : loadedProducts});
            console.log(fl);
        }
        else if(batch===""&& guide && domain===""){
            const fl = projects.filter(p=>{
                return p.guide === guide;
            })
            dispatch({type : FIL_PROJECTS, payload : loadedProducts});
            console.log(fl);
        }
        else if(batch===""&& guide==="" && domain){
            const fl = projects.filter(p=>{
                return p.Domain === domain;
            })
            dispatch({type : FIL_PROJECTS, payload : loadedProducts});
        }
	}
}

