"use client";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { contctEmailList, deleteContctEmail } from "./services";
import { CirclePlus, Edit, Trash2 } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import Form from "./Form/Form";
import { statusHandler } from "@/lib/helpers";

const MyWebsites = () => {
    const { data, isLoading, mutateAsync } = useMutation(contctEmailList);
    const [activeId, setActiveId] = useState(null);
    const [openForm, setOpenForm] = useState(false);
    const [addNew, setAddNew] = useState(false);

    ///delete ContctEmail
    const {
        isLoading: isLoadingDeleteContactEmail,
        mutateAsync: mutateAsyncDeleteContactEmail,
    } = useMutation(deleteContctEmail, { ...statusHandler() });

    useEffect(() => {
        mutateAsync();
    }, []);

    if (isLoading) return <LoadingSpinner />;
    else if (addNew) {
        return (
            <div className="border py-2 shadow-sm rounded-lg">
                <Form setOpenForm={setAddNew} refetch={mutateAsync} />
            </div>
        );
    }
    return (
        <div className="bg-white shadow-sm border p-4 rounded-md">
            <div className="flex items-center justify-between">
                <h6> My Websites</h6>
                <CirclePlus
                    onClick={() => {
                        setAddNew(true);
                    }}
                    size={18}
                    cursor={"pointer"}
                    className="text-blue-400"
                />
            </div>
            <hr className="my-2" />
            {data?.map((ele, index) => {
                return (
                    <div
                        key={index}
                        className={`border ${openForm ? "" : "rounded-full"
                            } shadow-sm my-2 p-2 text-xs  ps-2 `}
                    >
                        {(activeId !== ele?.id) && (
                            <div className="flex justify-between items-center">
                                <div className="ps-3">
                                    <small className="text-[13px] font-medium">{ele?.email}</small>
                                    <br />
                                    <small className="font-medium">{ele?.Website?.name}</small>
                                </div>
                                <div className="flex items-center flex-wrap gap-1">
                                    <button
                                        className="border rounded-full p-1 px-4 bg-gradient-to-r from-green-300 to-green-400 text-white"
                                        onClick={() => {
                                            setOpenForm(true);
                                            setActiveId(ele?.id);
                                        }}
                                    >
                                        <Edit size={14} />
                                    </button>
                                    <button
                                        onClick={async () => {
                                            setActiveId(ele?.id);
                                            await mutateAsyncDeleteContactEmail(ele?.id).then(
                                                async () => await mutateAsync()
                                            );
                                            setActiveId(null);
                                        }}
                                        className="border rounded-full p-1 px-4 bg-gradient-to-r from-orange-300 to-orange-500 text-white"
                                    >
                                        {isLoadingDeleteContactEmail && (activeId === ele?.id) ? (
                                            <LoadingSpinner />
                                        ) : (
                                            <Trash2 size={14} />
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}

                        {openForm && (activeId === ele?.id) && (
                            <Form
                                data={ele}
                                refetch={mutateAsync}
                                setOpenForm={(value) => {
                                    setOpenForm(value);
                                    setActiveId(null)
                                }}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default MyWebsites;
