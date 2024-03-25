import React, { useEffect } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    ArchiveRestore,
    File,
    Globe,
    Inbox,
    Mail,
    MessagesSquare,
    PackageX,
    Send,
    ShieldAlert,
    Trash2,
} from "lucide-react";
import { MenuSkelton } from "./Skelton/MenuSkelton";
import { useMutation } from "@tanstack/react-query";
import { contactCountsList, contactWebsite } from "../services";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_CONTACT_COUNTS, UPDATE_CONTACT_MENU_SELECTED, UPDATE_CONTACT_SELECTED_EMAIL } from "@/redux/contactReducer/contactReducer";
import useContact from "@/hooks/useContact";
import { getSelectedTitle } from "@/lib/helpers";

const Menus = ({ isLoading = false }) => {
    const dispatch = useDispatch()
    const { contactCounts, contactSelectedWebsite, contactMenuSelected, isAll } = useSelector(state => state.contactReducer)
    const { mutateAsyncContactList } = useContact()

    const { mutateAsync, isLoading: isLoadingCountLoad } = useMutation(contactCountsList, {
        onSuccess(counts) {
            //set data for coun
            dispatch({ type: UPDATE_CONTACT_COUNTS, payload: counts })
        }
    })

    const { mutateAsync: mutateAsyncWebsiteList, isLoading: isLoadingWebsiteList, data: dataEmailList } = useMutation(contactWebsite, {
        onSuccess([data]) {
            //set data for coun
            if (data?.name) {
                mutateAsync({ website: data?.name })
                dispatch({ type: UPDATE_CONTACT_SELECTED_EMAIL, payload: data?.name })
            } else {
                dispatch({ type: UPDATE_CONTACT_SELECTED_EMAIL, payload: null })
            }
        }
    })

    const listData = [
        {
            icon: <Inbox size={16} />,
            title: "Inbox",
            count: contactCounts?.inbox,
        },
        {
            icon: <File size={16} />,
            title: "Drafts",
            count: 0,
        },
        {
            icon: <Send size={16} />,
            title: "Sent",
        },
        {
            icon: <PackageX size={16} />,
            title: "Junk",
            count: contactCounts?.isJunk,
        },
        {
            icon: <Trash2 size={16} />,
            title: "Trash",
            count: contactCounts?.trashed,
        },
        {
            icon: <ArchiveRestore size={16} />,
            title: "Archive",
            count: contactCounts?.isArchive,
        },
    ];
    const listData2 = [
        {
            icon: <MessagesSquare size={16} />,
            title: "Forums",
            count: 0,
        },
        {
            icon: <ShieldAlert size={16} />,
            title: "Updates",
            count: 0,
        },
    ];


    useEffect(() => {
        mutateAsyncWebsiteList()
    }, [])

    const onSelectHandler = async (value) => {
        //handle count
        if (value) {
            await mutateAsync({ website: value })
        }
        dispatch({ type: UPDATE_CONTACT_SELECTED_EMAIL, payload: value })
    }

    //menu handler
    async function onMenuHandler(title) {
        let query = await getSelectedTitle(title, `?website=${contactSelectedWebsite}`)
        if (!isAll) {
            query += `&isRead=${isAll}`
        }
        //update title selection
        dispatch({ type: UPDATE_CONTACT_MENU_SELECTED, payload: title })

        mutateAsyncContactList({ query })
    }
    if (isLoading || isLoadingWebsiteList || isLoadingCountLoad) {
        return <MenuSkelton />
    }
    return (
        <>
            <div className="border-b border-green-200 p-2">
                <Select onValueChange={onSelectHandler} defaultValue={contactSelectedWebsite || ""}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Email" />
                    </SelectTrigger>
                    <SelectContent>
                        {dataEmailList?.map(({ name }) => {
                            return <SelectItem key={name} value={name}>
                                <div className="flex items-center gap-3">
                                    <Globe size={13} />
                                    {name}
                                </div>
                            </SelectItem>
                        })}
                    </SelectContent>
                </Select>
            </div>
            <div className="p-2 border-b text-[13px] border-green-200">
                {listData.map(({ count, icon, title }, index) => {
                    return (
                        <div
                            onClick={() => onMenuHandler(title)}
                            key={index}
                            className={`${contactMenuSelected === title
                                ? "bg-green-500  text-white "
                                : "hover:bg-neutral-100"
                                }  flex items-center justify-between cursor-pointer my-1 py-2 rounded-md px-3`}
                        >
                            <div className="flex items-center gap-2 ">
                                {icon}
                                <span className="font-medium">{title}</span>
                            </div>{" "}
                            <span className="font-medium">{count}</span>
                        </div>
                    );
                })}
            </div>
            <div className="p-2 py-0 text-[13px]">
                {listData2.map(({ count, icon, title }, index) => {
                    return (
                        <div
                            key={index}
                            className={`${false ? "bg-green-500  text-white " : "hover:bg-neutral-100"
                                }  flex items-center justify-between cursor-pointer my-1 py-2 rounded-md px-3`}
                        >
                            <div className="flex items-center gap-2 ">
                                {icon}
                                <span className=" font-medium">{title}</span>
                            </div>{" "}
                            <span className=" font-medium">{count}</span>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Menus;
