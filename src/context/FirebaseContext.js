import { createContext, useReducer } from 'react'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'

import firebaseReducer from './FirebaseReducer'

const FirebaseContext = createContext();

export const FirebaseProvider = ({children}) => {
  const initialState = {
    user: {},
    clients: [],
    client: {},
    loading: false,
  }
  const auth = getAuth()
  const [state, dispatch] = useReducer(firebaseReducer, initialState);


  const getUser = () => {
    setLoading();
    
    if(auth.currentUser) {
      console.log(auth.currentUser)
      console.log(state.user)
      dispatch({
        type: 'GET_USER',
        payload: auth.currentUser
      })
    }
  }

  const setLoading = () => dispatch({type: 'SET_LOADING'})

  return <FirebaseContext.Provider value={{
    ...state,
    dispatch,
    getUser,

  }}>
    {children}
  </FirebaseContext.Provider>
}



export default FirebaseContext