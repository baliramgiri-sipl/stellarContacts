"use client"
import { CircleX, Edit, X } from 'lucide-react'
import React, { useState } from 'react'
import avatarImg from "@/public/avatarPng.png"
import Image from 'next/image'
import Form from '../users/Form/Form'
import { useSession } from 'next-auth/react'
import FileUpload from './FileUpload'
const Profile = () => {
    const session = useSession()
    const [fileData, setFileData] = useState(null)
    const [edit, setEdit] = useState(false)
    const editHandler = () => {
        setEdit(true)
    }

    return (
        <div className='bg-white shadow-sm border p-4 rounded-md flex gap-2'>
            <div className='flex flex-col items-center'>
                <div className='w-[80px] h-[80px] flex justify-center items-center bg-white border rounded-full'>
                    {/* <User2Icon size={40} className='opacity-45' /> */}
                    <Image src={avatarImg} alt='profile pic' />
                </div>
                <FileUpload setFileData={setFileData} />
            </div>
            {/* <h3 className='font-medium'>My Profile</h3> */}
            <div className='flex-1 text-xs'>
                <div className='flex justify-end'>
                    {!edit && <button
                        onClick={editHandler}
                        className="border  ms-auto rounded-full p-1 px-4 bg-gradient-to-r from-green-300 to-green-400 text-white"
                    >
                        <Edit size={14} />
                    </button>}
                    {edit && <button
                        onClick={() => {
                            setEdit(false)
                        }}
                        className="border rounded-full p-1 px-4 bg-gradient-to-r from-orange-300 to-orange-500 text-white"
                    >
                        <X size={14} />
                    </button>}
                </div>
                <Form setEdit={setEdit} isProfile defaultData={session?.data?.user} isEdit={edit} />
            </div>
        </div>
    )
}

export default Profile