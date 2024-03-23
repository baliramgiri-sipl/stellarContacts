import React from 'react'

export const MenuSkelton = () => {
    return (
        <>
            <div class="border-b border-green-200 p-2  flex items-center justify-between animate-pulse">
                <div class="h-8 bg-gray-200 rounded w-full"></div>
            
            </div>
            <div class=" mt-1 h-full animate-pulse">
                <div class="h-6 bg-gray-200 rounded mt-3 mx-2 px-2 py-1"></div>
                <div class="my-3 overflow-y-auto h-[80%]">
                    <div class="h-10 bg-gray-200 rounded my-2 mx-2"></div>
                    <div class="h-10 bg-gray-200 rounded  mx-2 my-2"></div>
                    <div class="h-10 bg-gray-200 rounded  mx-2 my-2"></div>
                    <div class="h-10 bg-gray-200 rounded  mx-2 my-2"></div>
                </div>
            </div>
        </>
    )
}
