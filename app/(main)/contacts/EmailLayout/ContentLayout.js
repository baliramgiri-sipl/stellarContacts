"use client"
import React, { useEffect, useState } from 'react'
import {
    ArchiveRestore,
    EllipsisVertical,
    Forward,
    Loader2,
    PackageX,
    Reply,
    Trash2,
} from "lucide-react";
import { Button } from '@radix-ui/themes';
import ContentSkelton from './Skelton/ContentSkelton';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useMutation } from '@tanstack/react-query';
import { contactDelete, contactReplay, contactSingle, contactUpdate } from '../services';
import { UPDATE_CONTACT_CONTENT } from '@/redux/contactReducer/contactReducer';
import { useCountsUpdate } from '@/hooks/useCountsUpdate';
import UserAvtar from '@/components/useAvatar/UseAvatar';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { getContentTitle } from '@/lib/helpers';

const ContentLayout = ({ isLoading = true }) => {
    const [ActiveCompoment, setActiveCompoment] = useState(null)
    const dispatch = useDispatch()
    const { content, contactMenuSelected } = useSelector(state => state?.contactReducer)
    const [comment, setComment] = useState("")
    //hooks
    const { onCountsUpdated } = useCountsUpdate()
    const isDisabled = contactMenuSelected !== "Inbox"
    //get single contact
    const { mutateAsync: mutateAsyncContactSingle, isLoading: isLoadingContactSingle } = useMutation(contactSingle, {
        onSuccess(data) {
            dispatch({ type: UPDATE_CONTACT_CONTENT, payload: data })
        },
        onError() {
            dispatch({ type: UPDATE_CONTACT_CONTENT, payload: null })
        }
    })
    //delete
    const { mutateAsync, isLoading: isLoadingDelete } = useMutation(contactDelete, {
        onSuccess(deletedId) {
            onCountsUpdated("Move To Trash", deletedId, getContentTitle(contactMenuSelected)).then(() => dispatch({ type: UPDATE_CONTACT_CONTENT, payload: null }))
        }
    })
    //send reply
    const { mutateAsync: mutateAsyncContactReplay, isLoading: isLoadingContactReplay } = useMutation(contactReplay, {
        onSuccess(data) {
            dispatch({ type: UPDATE_CONTACT_CONTENT, payload: { ...content, ContactEmailReply: data } })
        }
    })

    //update in junk
    const { mutateAsync: updateJunkMuateAsync, isLoading: isLoadingUpdateJunk } = useMutation(contactUpdate, {
        onSuccess(updatedData) {
            onCountsUpdated("Add To Junk", updatedData?.id, getContentTitle(contactMenuSelected)).then(() => dispatch({ type: UPDATE_CONTACT_CONTENT, payload: null }))
        }
    })

    //update in Archives
    const { mutateAsync: updateArchiveMuateAsync, isLoading: isLoadingUpdateArchive } = useMutation(contactUpdate, {
        onSuccess(updatedData) {
            onCountsUpdated("Add To Archive", updatedData?.id, getContentTitle(contactMenuSelected)).then(() => dispatch({ type: UPDATE_CONTACT_CONTENT, payload: null }))
        }
    })

    const layout3Icons = [
        {
            icon: <ArchiveRestore size={16} />,
            title: "Add To Archive",
        },
        {
            icon: <PackageX size={16} />,
            title: "Add To Junk"
        },
        {
            icon: <Trash2 size={16} />,
            title: "Move To Trash"
        },
    ];

    const layout3Icons2 = [
        // {
        //     icon: <Reply size={16} />,
        //     title: "Add To Archive"
        // },
        // {
        //     icon: <Forward size={16} />,
        //     title: "Add To Junk"
        // },
        // {
        //     icon: <EllipsisVertical size={16} />,
        //     title: "Move To Trash"
        // },
    ];

    const handler = async (comp) => {
        setActiveCompoment(comp);
        switch (comp) {
            case "Move To Trash":
                await mutateAsync({ contactId: content?.id })
                break
            case "Add To Junk":
                await updateJunkMuateAsync({ values: { isJunk: true, isArchive: false }, contactId: content?.id })
                break
            case "Add To Archive":
                await updateArchiveMuateAsync({ values: { isArchive: true, isJunk: false }, contactId: content?.id })
                break
            default:
                break
        }
        setActiveCompoment(false);

    }
    //send reply
    const onSubmit = async (e) => {
        e.preventDefault()
        const contactEmailId = content?.Website?.ContactEmails?.find(({ is_active }) => is_active)
        if (contactEmailId) {
            await mutateAsyncContactReplay({ comment, contactId: String(content?.id), contactEmailId: String(contactEmailId?.id) })
            setComment("")
        } else {
            alert("No Active email found")
        }
    }
    useEffect(() => {
        if (content?.id) {
            mutateAsyncContactSingle({ contactId: content?.id })
        }
    }, [content?.id])


    if (isLoading || isLoadingContactSingle) {
        return <ContentSkelton />
    } else if (!content) {
        return <div className="p-2 border-b flex justify-between items-center border-green-200">
            <div className="flex items-center gap-2">
                {layout3Icons.map(({ icon, title, }, index) => {

                    return <div key={index} className="w-[30px] cursor-not-allowed h-[32px] text-neutral-300 flex items-center justify-center hover:bg-neutral-100  rounded-md">
                        {icon}
                    </div>
                })}
            </div>
            <div className="flex items-center gap-2">
                {layout3Icons2.map(({ icon }, index) => {
                    return <div key={index} className="w-[30px] cursor-not-allowed h-[32px] text-neutral-300 flex items-center justify-center hover:bg-neutral-100  rounded-md">
                        {icon}
                    </div>
                })}
            </div>
        </div>
    }
    return (
        <>
            <div className="p-2 border-b flex justify-between items-center border-green-200">
                <div className="flex items-center gap-2">
                    {layout3Icons.map(({ icon, title }, index) => {
                        let disabled = (title?.split(" ")[2] === contactMenuSelected) || contactMenuSelected === "Trash"
                        return <div key={index} onClick={disabled ? undefined : () => handler(title)} className={`w-[30px] relative h-[32px] group flex items-center justify-center hover:bg-neutral-100 ${disabled ? "bg-neutral-50 text-neutral-400 cursor-not-allowed" : " cursor-pointer"}  rounded-md`}>
                            {(isLoadingDelete || isLoadingUpdateJunk || isLoadingUpdateArchive) && (title === ActiveCompoment) ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : icon}
                            {!disabled && <div className='bg-neutral-800/60 p-2 z-10 rounded-md text-white text-[8px]  font-medium absolute hidden group-hover:block top-[25px] w-[75px] text-center'>
                                {title}
                            </div>}
                        </div>
                    })}
                </div>
                <div className="flex items-center gap-2">
                    {layout3Icons2.map(({ icon }, index) => {
                        return <div key={index} className="w-[30px] h-[32px] flex items-center justify-center hover:bg-neutral-100 cursor-pointer rounded-md">
                            {icon}
                        </div>
                    })}
                </div>
            </div>
            <div className='border-b flex justify-between  p-2 py-3  border-green-200'>
                <div className='flex  gap-5 '>

                    <div className='w-[40px] h-[40px] bg-neutral-200/60 rounded-full flex justify-center items-center text-sm'>
                        {content?.name && <UserAvtar name={content?.name} />}
                    </div>
                    <div className='flex flex-col '>
                        <h6 className="text-[14px] m-0 font-semibold text-neutral-700">
                            {content?.name}
                        </h6>

                        <small className="text-[11px] m-0 font-medium text-neutral-600 ">
                            Reply-To: {content?.email}
                        </small>
                    </div>

                </div>

                <div>
                    <small className="text-[11px] m-0 font-medium text-neutral-600 ">
                        {moment(content?.createdAt).format("MMM D [at] h:mm A")}
                    </small>

                </div>
            </div>

            <div className='p-4 text-[12px]   text-neutral-600 font-medium'>
                {content?.comment}
                {content?.ContactEmailReply && <div className='text-blue-400'>
                    {content?.ContactEmailReply?.comment}
                </div>}
            </div>
            <form onSubmit={onSubmit}>
                {!content?.ContactEmailReply && !isDisabled && <div className='absolute bottom-0 p-4 border-t-2 left-0 w-full border-green-200'>
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} required placeholder={`Reply ${content?.name}...`} className='border text-sm placeholder:text-sm w-full p-2 rounded-md outline-none'></textarea>
                    <Button type='submit' disabled={isLoadingContactReplay} className='bg-green-400 cursor-pointer rounded-full'>{isLoadingContactReplay ? <LoadingSpinner /> : "Send"}</Button>
                </div>}
            </form>

        </>
    )
}

export default ContentLayout