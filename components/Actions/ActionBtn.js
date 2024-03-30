import { Delete, Pencil, Trash2 } from 'lucide-react'
import React from 'react'


const ActionBtn = ({ onClick, disabled = false, isDelete = true, isEdit = true }) => {
    return (
        <>
            <div className="w-full flex items-center gap-1   h-full">
                {isEdit && <div disabled={disabled} onClick={() => onClick && onClick("edit")} className='border h-[25px] w-[25px] rounded-md flex items-center justify-center '>
                    <Pencil size={15} className="cursor-pointer" />
                </div>}
                {isDelete && <div disabled={disabled} onClick={() => onClick && onClick("delete")} className='border h-[25px] w-[25px] rounded-md text-red-500 flex items-center justify-center '>
                    <Trash2 size={15} className="cursor-pointer" />
                </div>}
            </div>
        </>
    )
}

export default ActionBtn