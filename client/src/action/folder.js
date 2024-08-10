import * as api from '../api'

export const CreateFolder = ( name ) => async(dispatch) => {
    try {
        const data = await api.createFolder({ name });
        dispatch({ type:"FOLDER_CREATE", data })
    } catch (error) {
        console.log('Error in action in creating a folder ',error);
    }
}

export const FetchFolder = () =>async ( dispatch ) => {
    try {
        const data = await api.fetchFolders();
        dispatch({ type:"FETCH_FOLDERS",data})
    } catch (error) {
        console.log('Error in action in fetching a folder ',error)
    }
}

export const DeleteFolder = (id) => async ( dispatch ) => {
    try {
        const data = await api.deleteFolder( id )
        dispatch({ type:'DELETE_FOLDER' , data });
    } catch (error) {
        console.log('Error in action in deleting a folder ',error)
    }
}

export const UpdateFolder = ( id , name ) => async(dispatch) => {
    try {
        const data = await api.updateFolder(id,{newName:name})
        dispatch({type:"UPDATE_FOLDER",data})
    } catch (error) {
        console.log('Error in action in updatng a folder ',error);
    }
}