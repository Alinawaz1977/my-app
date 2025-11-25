"use client"
import { AppContext } from '@/context/AppContext'
import axios from 'axios'
import React, { useContext } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
const Comment = ({ blogId }) => {
    const { token, fetchAllComments } = useContext(AppContext)
    const [comment, setcomment] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (token) {
                const response = await axios.post("/api/comment", { comment, blogId }, { headers: { token: token } })
                if (response.data.success) {
                    setcomment('')
                    fetchAllComments()
                } else {
                    toast.error(response.data.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <form onSubmit={handleSubmit} className='mt-3 ' >
            <p className='text-3xl flex items-center gap-2.5' ><span ><svg className='w-8' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6.45455 19L2 22.5V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H6.45455ZM5.76282 17H20V5H4V18.3851L5.76282 17ZM11 10H13V12H11V10ZM7 10H9V12H7V10ZM15 10H17V12H15V10Z"></path></svg></span>Comment</p>
            <textarea className='block w-full border pt-1 border-gray-300 mt-3 rounded-sm px-3' placeholder='Enter your comment here ' onChange={(e) => setcomment(e.target.value)} ></textarea>
            <button className='bg-amber-700 px-5 py-2 my-2 rounded-sm text-white' type="submit">Comment</button>
        </form>
    )
}

export default Comment