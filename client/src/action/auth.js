import * as api from '../api'
import { FetchFolder } from './folder';

export const SignUp = ( name , email , password ) => async(dispatch) => {
    dispatch({ type: 'AUTH_START' });
    try {
        const data = await api.Signup({ username:name,email,password });
        localStorage.setItem('token',data.data.token)
        dispatch({type:'AUTH',data})
        dispatch(GetUser())
    } catch (error) {
        dispatch({ type:'AUTH_ERROR', data : error.response })
    }
}

export const LogIn = ( email , password ) => async(dispatch) => {
    dispatch({ type: 'AUTH_START' });
    try {
        const data = await api.Login({email,password});
        localStorage.setItem('token',data.data.authtoken)
        dispatch({type:'AUTH',data})
        dispatch(GetUser())
        dispatch(FetchFolder())
    } catch (error) {
        dispatch({ type:'AUTH_ERROR', data : error.response , })
    }
    
}


export const GetUser = () => async(dispatch) => {
    try {
        const data = await api.getUser();
        dispatch({type:'USER_SUCCESS',data})
        localStorage.setItem('Profile',JSON.stringify(data))
    } catch (error) {
        dispatch({type:'USER_FAILURE',data:error.response})
        console.log('error in getting the user ',error)
    }
}


export const DeleteUser = (userId) => async(dispatch) => {
   try {
    const data = await api.deleteUser(userId)
    dispatch({type:'DELETE_USER',payload:data});
   } catch (error) {
    console.log('error in deleting the user',error)
   }
}
