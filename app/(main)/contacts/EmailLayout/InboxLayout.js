"use client"
import React, { useEffect, useState } from 'react'
import {
    Search
} from "lucide-react";
import ButtonGroup from "@/components/ButtonGroup/ButtonGroup";
import { Button } from "@radix-ui/themes";
import { momentTime } from '@/lib/helpers';
import InboxSkelton from './Skelton/InboxSkelton';
import { useMutation } from '@tanstack/react-query';
import { contactList, contactUpdate } from '../services';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { useToast } from '@/components/ui/use-toast';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_CONTACT_CONTENT, UPDATE_INBOX_DATA } from '@/redux/contactReducer/contactReducer';


const InboxLayout = ({ isLoading = false }) => {
    const dispatch = useDispatch()
    const { inboxData, content, isAll } = useSelector(state => state?.contactReducer)
    const { toast } = useToast()
    const [recordId, setRecordId] = useState(null)
    //contactlist Load again
    const { mutateAsync, isLoading: isAllLoading } = useMutation(contactList, {
        onSuccess(newData) {
            dispatch({ type: UPDATE_INBOX_DATA, payload: newData })
        }
    })

    const { isLoading: isLoadingUpdate, mutate } = useMutation(contactUpdate, {
        onSuccess(updatedData) {
            if (isAll === 0) {
                dispatch({ type: UPDATE_INBOX_DATA, payload: inboxData?.filter(({ id }) => id !== updatedData.id) })
            } else {
                const findindex = inboxData?.findIndex(({ id }) => id === updatedData?.id)
                inboxData[findindex]["isRead"] = updatedData.isRead
            }
        },
        onError(message) {
            toast({
                variant: "destructive",
                title: message || "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            })
        },
        onSettled() {
            setRecordId(null)
        }
    })

    const filterHandler = (value) => {
        if (value === 1) {
            mutateAsync({ query: "?email=giri71401@gmail.com" })
        } else {
            mutateAsync({ query: "?email=giri71401@gmail.com&isRead=0" })
        }
    }
    //save context
    const contentHandler = (value) => {
        dispatch({ type: UPDATE_CONTACT_CONTENT, payload: value })
    }

    if (isLoading) {
        return <InboxSkelton />
    }

    return (
        <>
            <div className="border-b border-green-200 p-2  flex items-center justify-between">
                <h6 className="font-medium text-[15px] text-neutral-700">Inbox</h6>
                <div className="bg-neutral-100 p-1 rounded-md">
                    <ButtonGroup value={isAll} onChange={filterHandler} />
                </div>
            </div>
            <div className=" mt-1 h-full">
                <div className="border mt-3 mx-2 px-2 py-1 rounded-md border-green-200 flex gap-2 items-center">
                    <Search size={16} className="text-green-500" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="placeholder:font-normal border-none outline-none flex-1 py-1 text-[13px]"
                    />
                </div>
                {!isAllLoading && <div className="my-3 overflow-y-auto h-[80%] b_messages_box">
                    {inboxData.map(
                        ({ comment, createdAt, isRead, name, id, ...rest }, index) => {
                            return (
                                <div
                                    onClick={() => {
                                        contentHandler({ comment, createdAt, isRead, name, id, ...rest })
                                    }}
                                    key={index}
                                    className={`${content?.id === id
                                        ? "border-green-200 bg-green-50"
                                        : "hover:bg-green-50 hover:border-green-200"
                                        } border cursor-pointer  mx-2 my-2   rounded-md p-2`}
                                >
                                    <div className="flex items-center justify-between flex-wrap">
                                        <h6 className="text-[14px] font-semibold text-neutral-700">
                                            {name}
                                        </h6>
                                        <small className="text-[11px] font-medium text-neutral-600 ">
                                            {momentTime(createdAt)}
                                        </small>
                                    </div>
                                    {/* <small className="text-[11px] font-medium">{subject}</small> */}
                                    <p className="text-[11px] mt-2 font-medium text-neutral-500">
                                        {comment}
                                    </p>
                                    {!isRead && (
                                        <Button
                                            onClick={isLoadingUpdate ? undefined : () => {
                                                setRecordId(id)
                                                mutate({ contactId: id, values: { isRead: true } })
                                            }}
                                            className="cursor-pointer rounded-full mt-2"
                                            variant="outline"
                                            size={"1"}
                                            color="green"
                                        >
                                            {isLoadingUpdate && recordId === id ? <LoadingSpinner /> : "Mark Read"}
                                        </Button>
                                    )}
                                </div>
                            );
                        }
                    )}
                </div>}
                {isAllLoading && <div class="my-3 overflow-y-auto h-[80%] b_messages_box animate-pulse">
                    <div class="border cursor-pointer mx-2 my-2 rounded-md p-2">
                        <div class="h-4 bg-gray-200 rounded w-full mt-2"></div>
                        <div class="h-10 bg-gray-200 rounded-full mt-2"></div>
                    </div>
                    <div class="border cursor-pointer mx-2 my-2 rounded-md p-2">
                        <div class="h-4 bg-gray-200 rounded w-full mt-2"></div>
                        <div class="h-10 bg-gray-200 rounded-full mt-2"></div>
                    </div>
                </div>}
            </div>


        </>
    )
}

export default InboxLayout