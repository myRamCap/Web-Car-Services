import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    Notification: null,
    email: null,
    role: null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {},
    setEmail: () => {},
    setRole: () => {}
})

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({})
    const [notification, _setNotification] = useState('')
    const [useremail, setUserEmail] = useState('')
    const [role, _setRole] = useState(localStorage.getItem('USER_ROLE'))
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

    const setRole = (role) => {
        _setRole(role)
        if (role) {
            localStorage.setItem('USER_ROLE', role)
        } else {
            localStorage.removeItem('USER_ROLE')
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
            setUserEmail,
            role,
            setRole,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)