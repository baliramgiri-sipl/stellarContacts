import { Plus } from 'lucide-react'
import React, { useMemo, useState } from 'react'
import InputSearchGloble from '../SearchInput/InputSearchGloble'
import { ModalBox } from '../ModalBox/ModalBox'

const Toolbar = ({ children, modalChildren, modalTitle, modalWidth, open, onOpen, onClose }) => {


    const icons = useMemo(() => [{
        icon: <Plus size={18} />,
        onClick() {
            onOpen && onOpen("plus")
        }
    }], [])

    return (
        <div className='flex items-center justify-end gap-2'>
            {icons.map(({ icon, onClick }, i) => {
                return <div onClick={onClick} key={i} className='w-[22px] h-[22px] rounded-full hover:text-blue-400 text-green-500 hover:border-blue-400 border-green-500 border flex justify-center items-center cursor-pointer gap-2'>
                    {icon}
                </div>
            })}
            {open && <ModalBox title={modalTitle} width={modalWidth} onClose={onClose} children={modalChildren} />}
            <InputSearchGloble width={30} onChange={(value) => { }} value={""} />
            {children}
        </div>
    )
}

export default Toolbar