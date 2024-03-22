"use client"
import React from 'react'
import InfiniteLoader from './InfiniteLoader'

const PageLoader = () => {
    return (
        <div className='min-h-screen fixed top-0 left-0 bg-neutral-500/20 z-20 w-full flex justify-center items-center'>
            <InfiniteLoader />
        </div>
    )
}

export default PageLoader