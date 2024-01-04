import {createContext, useCallback, useEffect, useState} from "react"
import { baseUrl,postRequest } from "../Utils/services";
import { json } from "react-router-dom";


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

    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    })
    
    console.log(loginInfo);

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("User"))
        setUser(user)
    }, []);

    const updateRegisterInfo = useCallback((info)=>{
        setRegisterInfo(info)
    }, []);

    const updateLoginInfo = useCallback((info)=>{
        setLoginInfo(info);
    }, []);

    const registerUser = useCallback(async(e)=>{
        e.preventDefault()
        setIsResgisterLoading(true)
        setRegisterError(null);

       const response = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo))
    
       setIsResgisterLoading(false);
       if(response.error){
            return setRegisterError(response)
       }
       localStorage.setItem("User", JSON.stringify(response));
       setUser(response);
    }, [registerInfo]);

    const loginUser = useCallback(async(e)=>{
        e.preventDefault();
        setIsLoginLoading(true);
        setLoginError(null);

        const response = await postRequest(`${baseUrl}/users/login`, JSON.stringify(loginInfo));
        setIsLoginLoading(false);
        if(response.error){
            return setLoginError(response);
        }
        localStorage.setItem("loginUser", JSON.stringify(response));
        setUser(response);
    }, [loginInfo])

    const logoutUser = useCallback(()=>{ 
        localStorage.removeItem("User");
        setUser(null);
    },[]);

    return (
        <AuthContext.Provider value={{user, registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading, logoutUser,loginError, isLoginLoading, updateLoginInfo, loginInfo, loginUser}}>
            {children}
        </AuthContext.Provider>
    ) 
}
