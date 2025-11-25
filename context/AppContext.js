"use client";
import axios from "axios";
import { createContext, useActionState, useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";

// Create the context
export const AppContext = createContext({});
const AppContextProvider = ({ children }) => {
    const [blogLists, setblogLists] = useState([])
    const [searchValue, setsearchValue] = useState('')
    console.log(searchValue);

    const [allComments, setallComments] = useState([])
    const [token, settoken] = useState(null)
    const fetchBlogData = async () => {
        try {
            const response = await axios.get("/api/listBlogs")
            if (response.data.success) {
                setblogLists(response.data.blogLists)
            } else {
                toast.error(response.data.error)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // for all comments
    const fetchAllComments = async () => {
        try {
            const response = await axios.get("/api/listComments")
            if (response.data.success) {
                setallComments(response.data.allComments)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        const savedToken = localStorage.getItem("token")
        if (savedToken) settoken(savedToken)
    }, [])


    useEffect(() => {
        fetchBlogData()
    }, [])
    useEffect(() => {
        fetchAllComments()
    }, [])


    const value = {
        token, settoken, blogLists, allComments, searchValue, setsearchValue,fetchAllComments
    };
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
