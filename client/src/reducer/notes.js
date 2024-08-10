const initialstate ={
   error:null,
   data:null,
   note:[]
}
const noteReducer = (state=initialstate,action) => {
  switch (action.type) {
   case 'CREATE_NOTES':
      return { ...state, data:action?.data  }

   case 'FETCH_ALL_NOTES':
      return { ...state , note:action?.data}

   case 'DELETE_NOTE':
      return { ...state , data:action?.data}

   case 'UPDATE_NOTE':
      return { ...state,  data:action?.data}
      
   default:
      return state
  }
}

export default noteReducer