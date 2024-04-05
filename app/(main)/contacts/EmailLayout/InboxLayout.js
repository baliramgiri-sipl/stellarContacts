"use client"
import React, { useEffect, useState } from 'react'
import {
    Search
} from "lucide-react";
import ButtonGroup from "@/components/ButtonGroup/ButtonGroup";
import { Button } from "@radix-ui/themes";
import { getSelectedTitle, momentTime } from '@/lib/helpers';
import InboxSkelton from './Skelton/InboxSkelton';
import { useMutation } from '@tanstack/react-query';
import { contactUpdate } from '../services';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { useToast } from '@/components/ui/use-toast';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_CONTACT_CONTENT, UPDATE_INBOX_DATA } from '@/redux/contactReducer/contactReducer';
import useContact from '@/hooks/useContact';
import useSocket from '@/hooks/useSocket';
import { useCountsUpdate } from '@/hooks/useCountsUpdate';
import SearchInput from './SearchInput';
import Pagination from './Pagination';


const InboxLayout = ({ isLoading = false }) => {
    const dispatch = useDispatch()
    const { inboxData, content, isAll, contactPaginationData, contactSelectedWebsite, contactMenuSelected, contactSearchInput, } = useSelector(state => state?.contactReducer)
    const { toast } = useToast()
    const [recordId, setRecordId] = useState(null)
    const { isAllLoading, mutateAsyncContactList } = useContact()
    const isDisabled = contactMenuSelected !== "Inbox"

    const { onCountsUpdated } = useCountsUpdate()
    //soket hook
    const { socket } = useSocket()

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
        if (contactSelectedWebsite) {
            let query = getSelectedTitle(contactMenuSelected, `?website=${contactSelectedWebsite}`)
            if (!value) {
                query += `&isRead=${value}`
            }
            if (contactSearchInput) {
                query += `&search=${contactSearchInput}`
            }
            mutateAsyncContactList({ query })
        }

    }
    //save context
    const contentHandler = (value) => {
        //if button is disabled
        if (!isDisabled && !value?.isRead) {
            mutate({ contactId: value?.id, values: { isRead: true } })
        }
        dispatch({ type: UPDATE_CONTACT_CONTENT, payload: value })
    }

    //socket connection
    useEffect(() => {
        if (socket) {
            socket.on("inboxes", async (data) => {
                //if user selected contact website then update inbox
                if (data?.website?.name == contactSelectedWebsite) {
                    onCountsUpdated("Add To Inbox", undefined, "inbox")
                    if (contactMenuSelected === "Inbox") {
                        dispatch({ type: UPDATE_INBOX_DATA, payload: [data, ...inboxData] })
                    }
                }
            })
            return () => {
                socket.off("inboxes");
            };
        }
    }, [socket, inboxData])

    if (isLoading) {
        return <InboxSkelton />
    }

    return (
        <>
            <div className="border-b border-green-200 p-2  flex items-center justify-between">
                <h6 className="font-medium text-[15px] text-neutral-700">Inbox</h6>
                <div className='flex flex-wrap'>
                    <Pagination />
                    <div className="bg-neutral-100 p-1 rounded-md">
                        <ButtonGroup value={isAll} onChange={filterHandler} />
                    </div>
                </div>
            </div>
            <div className=" mt-1 h-full">
                <SearchInput />
                {<div className="my-3 overflow-y-auto h-[80%] b_messages_box">
                    {!isAllLoading && inboxData?.map(
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
                                    {!isRead && !isDisabled && (
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
                    <div ref={contactPaginationData?.scrollRef}>
                        {isAllLoading && <h4>Loding....</h4>}
                    </div>
                </div>}

            </div>


        </>
    )
}

export default InboxLayout