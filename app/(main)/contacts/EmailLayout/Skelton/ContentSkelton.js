import React from 'react'

const ContentSkelton = () => {
    return (
        <div className="animate-pulse">
            <div className="p-2 border-b flex justify-between items-center border-green-200">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-gray-300 rounded-md"></div>
                    <div className="h-8 w-8 bg-gray-300 rounded-md"></div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-gray-300 rounded-md"></div>
                    <div className="h-8 w-8 bg-gray-300 rounded-md"></div>
                </div>
            </div>

            <div className='border-b flex justify-between p-2 py-3 border-green-200'>
                <div className='flex gap-5'>
                    <div className='w-16 h-16 bg-gray-300 rounded-full'></div>
                    <div className='flex flex-col'>
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                    </div>
                </div>
                <div className="h-4 bg-gray-300 rounded w-1/3">
                </div>
            </div>

            <div className='p-4 text-[12px] text-neutral-600 font-medium'>
                <div className="h-4 bg-gray-300 rounded w-full mt-1"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3 mt-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
            </div>
            <div className='p-4 text-[12px] text-neutral-600 font-medium'>
                <div className="h-4 bg-gray-300 rounded w-full mt-1"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3 mt-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
            </div>
            <div className='absolute bottom-0 p-4 border-t-2 left-0 w-full border-green-200'>
                <div className="h-10 bg-gray-300 rounded mt-1"></div>
                <div className="h-7 w-[100px] bg-gray-300 rounded mt-2"></div>
            </div>
        </div>
    )
}

export default ContentSkelton