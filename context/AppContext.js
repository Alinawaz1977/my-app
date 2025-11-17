"use client";
import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

// Create the context
export const AppContext = createContext({});
const AppContextProvider = ({ children }) => {
    const [blogLists, setblogLists] = useState([])
    const fetchBlogData = async () => {
        try {
            const response = await axios.post("/api/listBlogs", {}, { headers: { token: token } })
            if (response.data.success) {
                setblogLists(response.data.allBlogs)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const [token, settoken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : null)
    const value = {
        token, settoken, blogLists
    };
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
