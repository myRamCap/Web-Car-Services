import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    Notification: null,
    email: null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {},
    setEmail: () => {}
})

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({})
    const [notification, _setNotification] = useState('')
    const [useremail, setUserEmail] = useState('')
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'))

    const setNotification = (message) => {
        _setNotification(message)
        setTimeout(() => {
            _setNotification('')
        }, 5000)
    }

    const setToken = (token) => {
        _setToken(token)
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token)
        } else {
            localStorage.removeItem('ACCESS_TOKEN')
        } 
    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken,
            notification,
            setNotification,
            useremail,
            setUserEmail
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)