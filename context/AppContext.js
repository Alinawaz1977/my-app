"use client";
import { createContext, useState } from "react";

// Create the context
export const AppContext = createContext({});
const AppContextProvider = ({ children }) => {
    const [token, settoken] = useState('')
    const value = {
       token,settoken
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
