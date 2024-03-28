import React from 'react'
import "./ModalBox.css"
import { CircleX } from 'lucide-react'
export const ModalBox = ({ children, width = 30, onClose, title }) => {

    return (
        <div className='b_modal_box overflow-y-auto py-14'>
            <div style={{ width: `${width}%` }} className='bg-white border rounded-md p-2 b_modal_content'>
                <div className={`flex items-center  pb-1 justify-between ${title ? "border-b" : ""} relative`}>
                    {title && <h6 className='text-[16px]  ms-3 font-semibold'>{title}</h6>}
                    <div onClick={() => onClose && onClose(false)} className='cursor-pointer top-[-12px] bg-white rounded-full absolute right-[-12px]'>
                        <CircleX strokeOpacity={0.5} className='text-green-400' />
                    </div>
                </div>
                <div className='mt-2 pb-2'>
                    {children}
                </div>
            </div>
        </div>
    )
}
