"use client"
import { AppContext } from '@/context/AppContext'
import { useRouter } from 'next/navigation'
import react, { useContext, useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import Image from 'next/image'
const Navbar = () => {
    const router = useRouter()
    const { token, settoken, setsearchValue } = useContext(AppContext)
    const [visible, setvisible] = useState(false)
    const [userProfile, setuserProfile] = useState({})

    const fetchUserProfile = async () => {
        try {
            const response = await axios.post("/api/userProfile", {}, { headers: { token: token } })
            if (response.data.success) {
                setuserProfile(response.data.user)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) {
            fetchUserProfile()
        }
    }, [token])


    return (
        <div className='flex mx-4 my-3 border-b border-gray-300 pb-5 justify-between items-center' >
            <Link href={"/"} className='flex gap-1 items-center' >
                <p className='text-[#7e39f2] text-4xl font-bold'>G</p>
                <p className='font-bold text-2xl' >Blog</p>
            </Link>
            <input onChange={(e) => setsearchValue(e.target.value)} className='outline-none border border-gray-300 rounded-full w-1/2 px-2 py-1' type="text" placeholder='seach anything' />
            <div onClick={() => setvisible(!visible)}>
                {token ? <div className='h-10 w-10 rounded-full  relative' >
                    <Image src={userProfile.profilePic} fill={true} className='rounded-full object-cover' />
                    {visible ?
                        <div className='h-45 p-2 w-60 rounded-md flex flex-col bg-white border border-gray-200 shadow-2xl z-10 absolute left-[-200px]  bottom-[-180px]' >
                            <div>
                                <p className='text-2xl font-medium' >{userProfile.username}</p>
                                <p>{userProfile.email}</p>
                            </div>
                            <div className='py-1
                            '>
                                <Link href={"/user/profile"} className='py-1 hover:bg-gray-200 rounded-lg flex items-center gap-2' >
                                    <svg className='w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M14.2558 21.7442L12 24L9.74416 21.7442C5.30941 20.7204 2 16.7443 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12C22 16.7443 18.6906 20.7204 14.2558 21.7442ZM6.02332 15.4163C7.49083 17.6069 9.69511 19 12.1597 19C14.6243 19 16.8286 17.6069 18.2961 15.4163C16.6885 13.9172 14.5312 13 12.1597 13C9.78821 13 7.63095 13.9172 6.02332 15.4163ZM12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z"></path></svg>
                                    <p>Profile</p>
                                </Link>
                                <Link href={"/user/addblog"} className='py-1  hover:bg-gray-200 rounded-lg transition-all duration-500 flex gap-2' >
                                    <svg className='w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>
                                    <p>Add Blog</p>
                                </Link>
                                <div onClick={() => {
                                    localStorage.removeItem("token")
                                    router.push("/login")
                                }} className='py-1 hover:bg-gray-200 rounded-lg flex gap-2' >
                                    <svg className='w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(255,10,10,1)"><path d="M5 22C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6H18V4H6V20H18V18H20V21C20 21.5523 19.5523 22 19 22H5ZM18 16V13H11V11H18V8L23 12L18 16Z"></path></svg>
                                    <p>Logout</p>
                                </div>
                            </div>
                            <svg className='w-6 top-5 right-2   absolute ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>
                        </div>
                        : null}
                </div> : <button onClick={() => router.push("/login")} className='px-5 py-1 rounded-full text-white bg-[#7e39f2] ' >Log In</button>}
            </div>
        </div>
    )
}
export default Navbar