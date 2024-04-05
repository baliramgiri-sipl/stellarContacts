"use client"
import { UPDATE_IS_CONTACT_ALL } from '@/redux/contactReducer/contactReducer'
import { Button } from '@radix-ui/themes'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ButtonGroup = ({ onChange }) => {
    const dispatch = useDispatch()
    const { isAll } = useSelector(state => state?.contactReducer)
    return (
        <div className='flex items-center justify-center gap-3 rounded-md    w-[150px]'>
            <Button className='cursor-pointer' onClick={() => {
                dispatch({ type: UPDATE_IS_CONTACT_ALL, payload: 1 })
                onChange && onChange(1)
            }} variant={isAll == 1 ? 'solid' : "ghost"} size={"1"} color='gray'> All Contacts</Button>
            <Button className='cursor-pointer' onClick={() => {
                dispatch({ type: UPDATE_IS_CONTACT_ALL, payload: 0 })
                onChange && onChange(0)
            }} size={"1"} variant={isAll == 0 ? 'solid' : "ghost"} color='gray' > Unread</Button>
        </div>
    )
}

export default ButtonGroup