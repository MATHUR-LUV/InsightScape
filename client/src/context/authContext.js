
import { createContext, useEffect, useState } from "react";
// import axios from "axios";
import { makeRequest } from "../axios.js";
export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login = async (inputs) => {
        const res = await makeRequest.post("http://localhost:8800/api/auth/login", inputs, {
            withCredentials: true,
        });
        setCurrentUser(res.data);
    };

    const logout = async (inputs) => {
        await makeRequest.post("/auth/logout");
        setCurrentUser(null);
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    },[currentUser]);

    return (
        <AuthContext.Provider value={{currentUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    );

};