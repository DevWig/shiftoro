import { createContext, useReducer } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
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

  const setUser = (user) => {
    setLoading();


    dispatch({
      type: 'GET_USER',
      payload: user,
    }) 
  }
  const getUser = () => {
    setLoading();
    let currentUser = auth.currentUser()

    dispatch({
      type: 'GET_USER',
      payload: currentUser
    })
  }

  const setLoading = () => dispatch({type: 'SET_LOADING'})

  return <FirebaseContext.Provider value={{
    ...state,
    dispatch,
    setUser,
    getUser,
  }}>
    {children}
  </FirebaseContext.Provider>
}



export default FirebaseContext