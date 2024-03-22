import React from 'react'
import { X } from 'lucide-react';
const InputSearchGloble = ({ onChange, value, width = 100 }) => {
    return (
        <div style={{ width: `${width}%` }} className="example-wrapper ms-auto my-1 border rounded-md p-0.5 shadow-sm ">
            <div className="example-header flex">
                <input
                    type="text"
                    value={value}
                    placeholder="Search..."
                    className="border-none outline-none bg-none flex-1 ps-2  p-0.5 placeholder:text-xs text-sm "
                    onInput={({ target: { value } }) => onChange && onChange(value)}
                />
                {value && <button onClick={() => onChange && onChange("")} className='p-1 hover:bg-gray-100 rounded-full w-[25px] m-auto h-[25px]'><X size={15} /></button>}
            </div>
        </div>
    )
}

export default InputSearchGloble