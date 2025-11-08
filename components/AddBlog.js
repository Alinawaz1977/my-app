"use client"
import { useForm } from "react-hook-form"
import React from 'react'
import axios from "axios"

const AddBlog = () => {
  const { register, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    const formData = new FormData()
    formData.append("title", data.title)
    formData.append("content", data.content)
    formData.append("category", data.category)
    formData.append("featuredImage", data.featuredImage[0]) // actual file

    try {
      const response = await axios.post("/api/addblog", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      console.log(response.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("title")} placeholder="title" type="text" />
        <input {...register("featuredImage")} type="file" />
        <input {...register("content")} placeholder="content" type="text" />
        <select {...register("category")}>
          <option>education</option>
          <option>sport</option>
          <option>news</option>
          <option>health</option>
        </select>
        <button className="bg-green-600 text-white px-4 py-1.5 rounded-sm" type="submit">
          submit
        </button>
      </form>
    </div>
  )
}

export default AddBlog
