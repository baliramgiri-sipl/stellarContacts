import React from "react";
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
    Inbox,
    Mail,
    MessagesSquare,
    PackageX,
    Send,
    ShieldAlert,
    Trash2,
} from "lucide-react";
import { MenuSkelton } from "./Skelton/MenuSkelton";

const Menus = ({ isLoading = false }) => {
    const listData = [
        {
            icon: <Inbox size={16} />,
            title: "Inbox",
            count: 128,
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
            count: 23,
        },
        {
            icon: <Trash2 size={16} />,
            title: "Trash",
        },
        {
            icon: <ArchiveRestore size={16} />,
            title: "Archive",
        },
    ];
    const listData2 = [
        {
            icon: <MessagesSquare size={16} />,
            title: "Forums",
            count: 128,
        },
        {
            icon: <ShieldAlert size={16} />,
            title: "Updates",
            count: 0,
        },
    ];
    if (isLoading) {
        return <MenuSkelton />
    }
    return (
        <>
            <div className="border-b border-green-200 p-2">
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Email" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">
                            <div className="flex items-center gap-3">
                                <Mail size={13} />
                                giri71401@gmail.com
                            </div>
                        </SelectItem>
                        <SelectItem value="2">
                            <div className="flex items-center gap-3">
                                <Mail size={13} />
                                stellar@gmail.com
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="p-2 border-b text-[13px] border-green-200">
                {listData.map(({ count, icon, title }, index) => {
                    return (
                        <div
                            key={index}
                            className={`${index === 0
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
