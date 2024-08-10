 const authReducer = ( state = {data:null,loading:false,error:null},action ) => {
    switch (action.type) {
        case 'AUTH_START':
            return { ...state, loading: true, error: null };

        case 'AUTH':
            return { ...state , loading:false , data:action?.data  , error:null}

        case 'AUTH_ERROR':
            return { ...state , loading:false , error:action?.data }

        case 'RESET_AUTH_DATA':
            return { ...state , error:null , data:null}

        case 'USER_SUCCESS':
            return { ...state ,error:null,user:action?.data };

        case 'USER_FAILURE':
            return { ...state ,error:action?.data , data:null};
        
        case 'DELETE_USER':
            return { ...state ,error:null , data:action.payload}
            
        default:
            return state;
    }
}

export default authReducer
