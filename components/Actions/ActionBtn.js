import { Pencil } from 'lucide-react'
import React from 'react'


const ActionBtn = ({ onClick, disabled = false }) => {
    return (
        <>
            <div disabled={disabled} onClick={onClick} className="w-full flex items-center justify-center   h-full">
                <div className='border h-[25px] w-[25px] rounded-md flex items-center justify-center '>
                    <Pencil size={15} className="cursor-pointer" />
                </div>
            </div>
        </>
    )
}

export default ActionBtn