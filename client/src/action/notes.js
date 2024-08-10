import * as api from '../api'

export const CreateNotes = (folderId,title,content,tags,base64) => async(dispatch) => {
    try {
        const data = await api.createNotes({folderId,title,content,tags,base64});
        dispatch({ type:"CREATE_NOTES",data })
    } catch (error) {
        console.log('Error in createNotes action',error)
    }
}

export const FetchAllNotes = () => async (dispatch) => {
    try {
        const { data } = await api.fetchAllNotes();
        dispatch({ type: 'FETCH_ALL_NOTES', data });
    } 
    catch (error) {
        console.log('Error in action while fetching notes:', error);
    }
}

export const DeleteNote = (id) => async (dispatch)=> {
    try {
        const data = await api.deleteNote(id);
        dispatch({type:'DELETE_NOTE',data})
    }
    catch(error){
        console.log('Error in action while delete notes',error)
    }
}

export const UpdateNote = (id,title,content,tags,base64)=>async(dispatch)=>{
    try {
        const data = await api.updateNote(id,{title:title,content:content,tags:tags,base64:base64})
        dispatch({type:'UPDATE_NOTE',data})
    } 
    catch (error) {
        console.log('Error in action while update notes',error)
    }
}