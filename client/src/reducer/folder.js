
const folderReducer = ( state = { data:null , error:null },action) => {
    switch (action.type) {
        case 'FOLDER_CREATE':
            return { ...state, error:null , data:action?.data }

        case 'FETCH_FOLDERS':
            return { ...state, error:null ,folders:action?.data }

        case 'DELETE_FOLDER':
            return { ...state, error:null , data:action?.data}

        case 'UPDATE_FOLDER':
            return { ...state, error:null , data:action?.data}
        default:
            return state;
    }
}

export default folderReducer;