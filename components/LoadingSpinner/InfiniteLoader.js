"use client"
import React from 'react'
import { ColorRing } from 'react-loader-spinner'


const InfiniteLoader = ({ message }) => {
    return (
        <div className='text-center'>  <div className='min-h-[50px] w-full flex justify-center items-center'>
            <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperclassName="color-ring-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
        </div>
            <span className='text-black font-semibold text-xs'> {message}</span>
        </div>


    )
}

export default InfiniteLoader