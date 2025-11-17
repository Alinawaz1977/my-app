"use client"
import React, { useContext } from 'react'
import BlogPost from './BlogPost'
import { AppContext } from '@/context/AppContext'

const HeroBlog = () => {
  const {blogLists}=useContext(AppContext)
  return (
    <div className='w-[70vw] h-[80vh]' >
      <BlogPost />
    </div>
  )
}

export default HeroBlog