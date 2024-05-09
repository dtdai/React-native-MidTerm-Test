import { createContext, useContext, useMemo, useReducer } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { addDoc, collection, doc, onSnapshot } from 'firebase/firestore'
import { db, auth } from './firebase'

const MyContext = createContext()
MyContext.displayName = 'My Store'
const reducer = (state, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return { ...state, userLogin: action.value }
    case 'LOGOUT':
      return { ...state, userLogin: null }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const MyContextControllerProvider = ({ children }) => {
  const initialState = {
    userLogin: null,
    jobs: []
  }
  const [controller, dispatch] = useReducer(reducer, initialState)
  const value = useMemo(() => [controller, dispatch], [controller, dispatch])
  return (
    <MyContext.Provider value={value}> {children} </MyContext.Provider>
  )
}

const useMyContextProvider = () => {
  const context = useContext(MyContext)
  if (!context) {
    throw new Error('useMyContextController should be used inside the MyContextControllerProvider')
  }
  return context
}

const USERS = collection(db, 'userLogin')
const JOBS = collection(db, 'jobs')

const createAccount = async (email, password, fullName) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert('Create successful with ' + email)
      addDoc(USERS, {
        email, fullName
      })
    })
    .catch(e => console.log(e.message))
}

const login = async (dispatch, email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
    const unsubscribe = onSnapshot(doc(db, 'userLogin', 'p5dNWBWds9ZWbNtgcTHl'), (u) => {
      console.log(u.data())
      if (u.exists()) {
        alert('Login successful!');
        dispatch({ type: 'USER_LOGIN', value: u.data() });
      } else {
        alert('User data not found');
      }
    })

    return () => unsubscribe()
  } catch (error) {
    alert('Wrong email or password!')
    console.error(error.code + ' ' + error.message)
  }
}


const logout = async (dispatch) => {
  await signOut(auth)
    .then(() => dispatch({ type: 'LOGOUT' }))
}

export {
  MyContextControllerProvider,
  useMyContextProvider,
  createAccount,
  login,
  logout,
  // addJob
}