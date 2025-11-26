import Image from 'next/image'
import React from 'react'

const ShowComment = ({ comment,commentDate, commentUserLogo, commentUserName }) => {
    const localDate=new Date(commentDate).toLocaleDateString()
    return (
        <div>
            <div className='flex gap-2' >
                <Image width={100} height={100} className='w-10 h-10 rounded-full object-cover object-top' src={commentUserLogo} alt='userProfilePIc' />
                <div className='flex flex-col' >
                    <p className='text-[13px]' >
                        {commentUserName}
                    </p>
                    <p className='text-[13px]' >{localDate}</p>
                    <p className='font-medium' >{comment}</p>
                </div>
            </div>
        </div>
    )
}

export default ShowComment