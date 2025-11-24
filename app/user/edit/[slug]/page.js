"use client"
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { useForm } from "react-hook-form"
import JoditEditor from 'jodit-react'
import React, { useContext } from 'react'
import { useParams } from 'next/navigation'
import { AppContext } from '@/context/AppContext'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const page = () => {

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()

    const { blogLists, token } = useContext(AppContext)
    const [currentBlog, setcurrentBlog] = useState(null)
    const [newFeaturedImage, setnewFeaturedImage] = useState('')

    const params = useParams()
    console.log(params.slug);

    const fetchBlogData = () => {
        if (blogLists) {
            const currentBlogData = blogLists.find((item) => item._id == params.slug)
            setcurrentBlog(currentBlogData)
        }

    }
    useEffect(() => {
        fetchBlogData()
    }, [params.slug, blogLists])

    // for default values
    useEffect(() => {
        if (currentBlog) {
            reset({
                title: currentBlog.title,
                content: currentBlog.content,
                featureImage: currentBlog.featuredImage
            })
        }
    }, [currentBlog])

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <>
            <Navbar />
            <div className='flex' >
                <Sidebar />
                <form onSubmit={handleSubmit(onSubmit)} className='w-full md:w-[70vw] px-5 py-3 border border-gray-300 h-[80vh] overflow-scroll' >
                    <p className='text-3xl pb-3 ' >Update Blog</p>
                    <p className='text-xl ' >Title</p>
                    <input {...register("title")} className='w-full mt-2 rounded-md px-2 py-1 border border-gray-300' type="text" />
                    <p className='text-xl mt-2' >Category</p>
                    <select className='w-full border border-gray-300 py-1 px-2 mt-2 rounded-md' {...register("category")} >
                        <option>Entertainment</option>
                        <option>Sport</option>
                        <option>News</option>
                        <option>Education</option>
                        <option>Health</option>
                    </select>
                    <p className='text-xl my-2' >Featured Image</p>
                    <div className='relative flex justify-center items-center  border border-gray-300 h-[30vh] w-full' >
                        <Image fill={true} className='object-cover' src={newFeaturedImage ? URL.createObjectURL(newFeaturedImage) : currentBlog?.featuredImage} alt='featuredImage' />
                    </div>
                    <label htmlFor="featuredImage">
                        <input onChange={(e) => setnewFeaturedImage(e.target.files[0])} id='featuredImage' className='hidden  w-50 border border-gray-300 
                    ' type="file" />
                        <p className='bg-blue-600 font-medium px-3 py-1 w-fit text-white rounded-md mt-2' >Update FeaturedImage</p>
                    </label>
                    <p className='text-xl my-2' >Blog Content</p>
                    <JoditEditor
                        {...register("content")}
                    />
                    <button className='text-white bg-[#7e39f2] px-2 py-1 rounded-md my-2 font-medium' type="submit">Update Blog</button>
                </form>
            </div>
        </>
    )
}

export default page