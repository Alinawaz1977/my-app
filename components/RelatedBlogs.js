"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const RelatedBlogs = ({ RelatedBlogFeaturedImage, RelatedBlogTitle, id }) => {
  const router = useRouter()
  return (
    <div onClick={() => {
      router.push(`/blog/${id}`)
    }} className='flex items-center mt-2 gap-2' >
      <Image height={100} width={100} className=' w-28 object-cover h-15 rounded-md' src={RelatedBlogFeaturedImage} alt='relatedBlogImage' />
      <p className='text-sm' >{RelatedBlogTitle}</p>
    </div>
  )
}

export default RelatedBlogs