"use client"
import React, { useEffect, useState } from "react";
import "./EmailLayout.css";
import Menus from "./Menus";
import InboxLayout from "./InboxLayout";
import ContentLayout from "./ContentLayout";
import { useSelector } from "react-redux";
import { getSelectedTitle } from "@/lib/helpers";
import useContact from "@/hooks/useContact";

export const EmailLayout = () => {

    const { contactSelectedWebsite, contactMenuSelected, contactSearchInput } = useSelector(state => state?.contactReducer)
    const [isLoading, setIsLoading] = useState(false)
    //contactlist Load again
    const { mutateAsyncContactList } = useContact()

    useEffect(() => {
        if (contactSelectedWebsite && !contactSearchInput) {
            setIsLoading(true)
            let query = getSelectedTitle(contactMenuSelected, `?website=${contactSelectedWebsite}`)
            mutateAsyncContactList({ query }).then(() => {
            }).finally(() => setIsLoading(false))
        }
        return () => { }
    }, [contactSelectedWebsite])

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
