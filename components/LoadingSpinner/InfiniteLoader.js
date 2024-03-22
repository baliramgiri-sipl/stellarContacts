"use client"
import React from 'react'
import { InfinitySpin } from 'react-loader-spinner'

const InfiniteLoader = ({ message }) => {
    return (
        <div className='text-center'>  <div className='min-h-[50px] w-full flex justify-center items-center'>
            <InfinitySpin
                width='200'
                color='#FF9130'
            />

        </div>
            <span className='text-black font-semibold text-xs'> {message}</span>
        </div>


    )
}

export default InfiniteLoader