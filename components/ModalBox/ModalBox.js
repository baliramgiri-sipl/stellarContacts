import React, { useState } from 'react'
import "./ModalBox.css"
import { CirclePlus, CircleX, SquarePlus } from 'lucide-react'
export const ModalBox = ({ children, width = 30, onClose, title }) => {

    return (
        <div className='b_modal_box'>
            <div style={{ width: `${width}%` }} className='bg-white border rounded-md p-2 b_modal_content'>
                <div className={`flex items-center  pb-1 justify-between ${title ? "border-b" : ""} relative`}>
                    {title && <h6 className='text-sm  font-semibold'>{title}</h6>}
                    <div onClick={() => onClose && onClose(false)} className='cursor-pointer top-[-12px] bg-white rounded-full absolute right-[-12px]'>
                        <CircleX strokeOpacity={0.5} className='text-green-400' />
                    </div>
                </div>
                <div className='mt-2'>
                    {children}
                </div>
            </div>
        </div>
    )
}
