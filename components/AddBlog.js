"use client"
import React from 'react'
import { useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import { useForm } from "react-hook-form"
import { onBlogActionSubmit } from '@/app/actions/AddBlogAction';
import Image from 'next/image';
const AddBlog = () => {
    const [file, setfile] = useState(null)
    const {
        register,
        handleSubmit,
        watch,
        trigger,
        setValue,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const image = data.featureimage[0]
        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("category", data.category)
        formData.append("content", data.content)
        formData.append("featuredImage", image)
        onBlogActionSubmit(formData)
        setfile('')
        reset()
    }

    const editor = useRef(null);

    const [content, setContent] = useState('');
    return (
        <div className='border border-gray-300 pl-10 pt-5 min-h-[90vh] w-[70vw]' >
            <form onSubmit={handleSubmit(onSubmit)}>
                <p className='text-3xl font-medium' >Add new Blog</p>
                <p className='my-2 text-xl font-medium ' >Category</p>
                <select {...register("category", { required: { value: true, message: "this field is required" } })} className='w-[95%] py-2 rounded-sm border border-gray-300 ' >
                    <option value="Education">Education</option>
                    <option value="travel">travel</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Sport">Sport</option>
                </select>
                {errors.category && <p className='text-red-500' >{errors.category.message}</p>}
                <p className='my-2 text-xl font-medium ' >Title</p>
                <input {...register("title", { required: { value: true, message: "this filed is required" } })} name='title' className='w-[95%] py-2 rounded-sm border border-gray-300 px-2 ' placeholder='title here' type="text" />
                {errors.title && <p className='text-red-500' >{errors.title.message}</p>}
                <p className='my-4 text-xl font-medium ' >Title</p>
                <label className='flex border relative  w-60 h-50 justify-center items-center' htmlFor="featureimage">{file ? <Image src={URL.createObjectURL(file)} fill={true} alt='featuredImage' /> : <p>feature image</p>}
                    <input   {...register("featureimage", { required: { value: true, message: "this filed is required" } })} hidden onChange={(e) => setfile(e.target.files[0])} id='featureimage' type="file" />
                </label>
                {errors.featuredimage && <p className='text-red-500' >{errors.featuredimage.message}</p>}
                <p className='my-3 text-xl font-medium ' >Content</p>
                <textarea
                    readOnly name='content' hidden value={content} placeholder='type or paste your content here ' className='w-[95%] px-2 rounded-sm border border-gray-300' ></textarea>
                <JoditEditor
                    {...register("content", { required: { value: true, message: "this filed is required" } })}
                    ref={editor}
                    value={content}
                    tabIndex={1} // tabIndex of textarea
                    // onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                    onBlur={(newContent) => {
                        setValue("content", newContent, { shouldValidate: true });
                        setContent(newContent)
                        trigger("content")
                    }
                    }
                />
                {errors.content && <p className='text-red-500' >{errors.content.message}</p>}
                <button className='py-1 mt-1 px-5 text-white rounded-sm cursor-pointer font-medium bg-[#7e39f2]' type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddBlog
