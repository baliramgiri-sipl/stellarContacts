import { CircleAlert, CircleCheck } from 'lucide-react'
import React from 'react'


const ErrorComp = ({ type, message }) => {
    if (type === "error") return <div className='bg-red-50 flex gap-1 items-center text-red-500 my-3 break-words px-2 p-2 font-semibold rounded-md'>
        <CircleAlert size={15} />   <span className='text-xs'>{message}</span>
    </div>
    return (
        <div className='bg-green-50 flex gap-1 items-center text-green-500 my-3 break-words px-2 p-2 font-semibold rounded-md'>
            <CircleCheck  size={15} />   <span className='text-xs'>{message}</span>
        </div>
    )
}

export default ErrorComp