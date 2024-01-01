import {createContext, useCallback, useEffect, useState} from "react"
import { baseUrl,postRequest } from "../Utils/services";


export const AuthContext = createContext();


export const AuthContextProvider = ({children}) =>{
    const [user, setUser ] = useState(null);
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsResgisterLoading] = useState(false)
    const [registerInfo, setRegisterInfo ] = useState({
        name: "",
        email: "",
        password: ""
    });
    
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("User"))
        setUser(user)
    }, []);

    const updateRegisterInfo = useCallback((info)=>{
        setRegisterInfo(info)
    }, []);

    const registerUser = useCallback(async(e)=>{
        e.preventDefault()
        setIsResgisterLoading(true)
        setRegisterError(null);

       const response = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo))

       setIsResgisterLoading(false)
       if(response.error){
            return setRegisterError(response)
       }
       localStorage.setItem("User", JSON.stringify(response));
       setUser(response);
    }, [registerInfo]);

    const logoutUser = useCallback(()=>{
        localStorage.removeItem("User");
        setUser(null);
    })
    return (
        <AuthContext.Provider value={{user, registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading, logoutUser}}>
            {children}
        </AuthContext.Provider>
    ) 
}
