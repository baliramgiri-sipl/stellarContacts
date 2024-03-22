import React from 'react'
import { MdOutlineDelete } from "react-icons/md";
import { Popconfirm } from "antd";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { FiEdit } from 'react-icons/fi';
const ActionColumn = ({ onClick, showedit = true }) => {
    return (

        <div className='flex  justify-center action-columns'>
            {showedit && <span className='border p-1 cursor-pointer rounded-md border-blue-600 text-blue-600'>
                <FiEdit
                    onClick={() => onClick && onClick("edit")}
                    size={15}
                />
            </span>}
            <Popconfirm
                title="Are you sure you want to delete？"
                onConfirm={() => {
                    onClick && onClick("delete")
                }}
                getPopupContainer={(trigger) => trigger.parentElement}
                placement="left"
                zIndex={222222222}
                icon={
                    <AiOutlineQuestionCircle
                        style={{
                            color: "red",
                        }}
                    />
                }
                okText="Yes"
                cancelText="No"
            >
                <span className={"ms-2 border p-1  cursor-pointer rounded-md border-red-600 text-red-600"}>
                    <MdOutlineDelete  size={16} />
                </span>
            </Popconfirm>
        </div>
    )
}

export default ActionColumn