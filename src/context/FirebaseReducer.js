const firebaseReducer = (state, action) => {
  switch(action.type) {
    case 'GET_USER':
      return {
        ...state,
        user: action.payload,
        loading: false,
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      }
    default:
      return state
  }
};

export default firebaseReducer