import React from 'react'

const InboxSkelton = () => {
    return (
        <>
            <div className="border-b border-green-200 p-2  flex items-center justify-between animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
            <div className=" mt-1 h-full animate-pulse">
                <div className="h-6 bg-gray-200 rounded mt-3 mx-2 px-2 py-1"></div>
                <div className="my-3 overflow-y-auto h-[80%]">
                    <div className="h-20 bg-gray-200 rounded my-2 mx-2"></div>
                    <div className="h-20 bg-gray-200 rounded  mx-2 my-2"></div>
                    <div className="h-20 bg-gray-200 rounded  mx-2 my-2"></div>
                    <div className="h-20 bg-gray-200 rounded  mx-2 my-2"></div>
                </div>
            </div>
        </>
    )
}

export default InboxSkelton