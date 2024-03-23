import React from 'react'

const ContentSkelton = () => {
    return (
        <div class="animate-pulse">
            <div class="p-2 border-b flex justify-between items-center border-green-200">
                <div class="flex items-center gap-2">
                    <div class="h-8 w-8 bg-gray-300 rounded-md"></div>
                    <div class="h-8 w-8 bg-gray-300 rounded-md"></div>
                </div>
                <div class="flex items-center gap-2">
                    <div class="h-8 w-8 bg-gray-300 rounded-md"></div>
                    <div class="h-8 w-8 bg-gray-300 rounded-md"></div>
                </div>
            </div>

            <div class='border-b flex justify-between p-2 py-3 border-green-200'>
                <div class='flex gap-5'>
                    <div class='w-16 h-16 bg-gray-300 rounded-full'></div>
                    <div class='flex flex-col'>
                        <div class="h-4 bg-gray-300 rounded w-1/2"></div>
                        <div class="h-4 bg-gray-300 rounded w-1/3"></div>
                    </div>
                </div>
                <div class="h-4 bg-gray-300 rounded w-1/3">
                </div>
            </div>

            <div class='p-4 text-[12px] text-neutral-600 font-medium'>
                <div class="h-4 bg-gray-300 rounded w-full mt-1"></div>
                <div class="h-4 bg-gray-300 rounded w-2/3 mt-2"></div>
                <div class="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
            </div>
            <div class='p-4 text-[12px] text-neutral-600 font-medium'>
                <div class="h-4 bg-gray-300 rounded w-full mt-1"></div>
                <div class="h-4 bg-gray-300 rounded w-2/3 mt-2"></div>
                <div class="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
            </div>
            <div class='absolute bottom-0 p-4 border-t-2 left-0 w-full border-green-200'>
                <div class="h-10 bg-gray-300 rounded mt-1"></div>
                <div class="h-7 w-[100px] bg-gray-300 rounded mt-2"></div>
            </div>
        </div>
    )
}

export default ContentSkelton