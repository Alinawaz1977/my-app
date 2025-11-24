    "use client"
    import { AppContext } from '@/context/AppContext'
    import axios from 'axios'
    import Image from 'next/image'
    import React, { useContext, useEffect } from 'react'
    import { useState } from 'react'
    import { toast } from 'react-toastify'
    import animationData from "@/public/Insider-loading"
    import { useForm } from "react-hook-form"
    import Lottie from 'lottie-react'


    const UpdateProfile =  () => {
        const {token}=useContext(AppContext)
        const [userProfileData, setUserProfileData] = useState(null)
        const [loading, setLoading] = useState(false)
        const [image, setimage] = useState('')
        // console.log(userProfileData);

        const {
            register,
            handleSubmit,
            watch,
            reset,
            formState: { isSubmitting, errors },
        } = useForm()

        const onSubmit = async (data) => {
            console.log(data);
            const formData = new FormData()
            formData.append("profilePic", data.profilePic[0])
            formData.append("username", data.username)
            formData.append("email", data.email)
            formData.append("bio", data.bio)
            try {
                const response = await axios.post("/api/userProfileUpdate", formData, { headers: { token: token } })
                if (response.data.success) {
                    toast.success(response.data.success)
                } else {
                    toast.error(response.data.error)
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        useEffect(() => {
            if (userProfileData) {
                reset({
                    username: userProfileData.username,
                    email: userProfileData.email,
                    bio: userProfileData.bio,
                    // profilePic: userProfileData.profilePic  // stays empty because files can't have defaults
                })
            }
        }, [userProfileData])


        const fetchUserProfile = async () => {
            try {
                setLoading(true)
                const response = await axios.post("/api/userProfile", {}, { headers: { token: token } })
                console.log(response.data.message);

                if (response.data.success) {
                    setUserProfileData(response.data.user)
                } else {
                    toast.error(response.data.message)
                }
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }
        useEffect(() => {
            if(token){
                fetchUserProfile()
            }
        }, [token])
        if (loading) {
            return <div className='flex  w-full items-center overflow-hidden justify-center   ' >
                <Lottie className='w-[50vw] h-[50vw] pb-50' animationData={animationData} loop={true} />
            </div>
        }

        return (
            <form onSubmit={handleSubmit(onSubmit)} className='w-full md:w-[60vw] overflow-hidden p-10 h-[80vh] border border-gray-200 shadow-sm relative  b' >
                <div className='flex justify-center items-center flex-col' >
                    <div className='relative h-30  w-30  ' >
                        <label htmlFor="profilepic">
                            <input {...register("profilePic",)} onChange={(e) => setimage(e.target.files[0])} type="file" id='profilepic' className='absolute text-[1px] ' />
                            <Image alt='profilepic' fill={true} id='profilepic' className='object-top rounded-full object-cover' src={image ? URL.createObjectURL(image) : userProfileData?.profilePic} />
                        </label>
                    </div>
                    <p className='text-2xl font-medium' >ALI NAWAZ</p>
                </div>
                <div className=' mt-3' >
                    <p>Name</p>
                    <input {...register("username")} defaultValue={userProfileData?.username} className='border-2 py-1 border-gray-200 mt-2 w-full px-3 rounded-sm ' type="text" />
                </div>
                <div className=' mt-3' >
                    <p>Email</p>
                    <input {...register("email")} defaultValue={userProfileData?.email} className='border-2 py-1 border-gray-200 mt-2 w-full px-3 rounded-sm ' type="text" />
                </div>
                <div className=' mt-3' >
                    <p>Bio</p>
                    <textarea {...register("bio")} defaultValue={userProfileData?.bio} className='border-2 py-1 border-gray-200 mt-2 w-full px-3 rounded-sm ' ></textarea>
                </div>
                {isSubmitting ? <Lottie loop={true} className='w-50 h-50' animationData={animationData} /> :
                    <button className='bg-[#7e39f2] px-4 cursor-pointer py-2 rounded-sm text-white mt-3' type="submit">Save details</button>
                }
            </form >
        )
    }

    export default UpdateProfile