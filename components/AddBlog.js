"use client";
import React, { useContext, useState } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import axios from "axios";
import Image from "next/image";
import { onBlogActionSubmit } from "@/app/actions/AddBlogAction";
import { toast } from "react-toastify";
import { AppContext } from "@/context/AppContext";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const AddBlog = () => {
  const { token } = useContext(AppContext)
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()
  const [content, setContent] = useState("");
  const [image, setimage] = useState('')
  console.log(image);
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", content);
    formData.append("category", data.category);
    formData.append("featuredImage", data.featuredImage[0]);

    try {
      const response = await axios.post("/api/addblog", formData, { headers: { token: token } }
      );
      if (response.data.success) {
        toast.success(response.data.message)
      } else {
        toast.error(response.data.error)
      }
    } catch (error) {
      toast.error(error.message);
    }
    reset()
    setContent("")
    setimage("")
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input {...register("title")} placeholder="Title" className="border p-2 rounded" />
        <label className="h-[20vw] relative flex justify-center items-center border border-dotted border-gray-500 w-[20vw]" htmlFor="featureImage">
          {image ? <Image className="object-cover" fill={true} src={URL.createObjectURL(image)} alt="feaaturedImage" /> : <p></p>}
          <input id="featureImage"  {...register("featuredImage")} type="file" className="border text-sm w-1/2 p-2   " onChange={(e) => setimage(e.target.files[0])}
          />
        </label>
        <JoditEditor
          value={content}
          onBlur={(newContent) => setContent(newContent)}
          tabIndex={1}
        />
        <select {...register("category")} className="border p-2 rounded">
          <option >Sport</option>
          <option >Education</option>
          <option>News</option>
          <option>Health</option>
        </select>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
