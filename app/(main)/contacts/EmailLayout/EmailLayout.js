"use client"
import React, { useEffect, useState } from "react";
import "./EmailLayout.css";
import Menus from "./Menus";
import InboxLayout from "./InboxLayout";
import ContentLayout from "./ContentLayout";
import { useMutation } from "@tanstack/react-query";
import { contactList } from "../services";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_INBOX_DATA } from "@/redux/contactReducer/contactReducer";

export const EmailLayout = () => {
    const dispatch = useDispatch()
    const { isAll } = useSelector(state => state?.contactReducer)
    const [isLoading, setIsLoading] = useState(false)
    const { mutateAsync } = useMutation(contactList, {
        onSuccess(data) {
            if (isAll === 0) {
                dispatch({ type: UPDATE_INBOX_DATA, payload: data?.filter(({ isRead }) => !isRead) })
            } else {
                dispatch({ type: UPDATE_INBOX_DATA, payload: data })
            }
        }
    })

    useEffect(() => {
        setIsLoading(true)
        mutateAsync({ query: "?email=giri71401@gmail.com" }).then(() => {
            setIsLoading(false)
        })
        return () => { }
    }, [])

    return (
        <div className="border h-[80vh] rounded-md border-green-200  flex shadow-md">
            <div className="w-[18%]  h-full border-green-200  border-r">
                <Menus isLoading={isLoading} />
            </div>
            <div className="w-[35%]  h-full border-r border-green-200 ">
                <InboxLayout isLoading={isLoading} />
            </div>
            <div className=" flex-1  relative border-green-200   h-full">
                <ContentLayout isLoading={isLoading} />
            </div>
        </div>
    );
};
