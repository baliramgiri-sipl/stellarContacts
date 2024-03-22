import React, { memo, useRef } from "react";

import { useState } from "react";
import { useEffect } from "react";
import "./MultiTreeSelect.css";
import dynamic from "next/dynamic";
dynamic(() => import("antd/dist/reset.css"), { ssr: false })
import { Input, Tree } from "antd";
import MyLabel from "@/components/Texts/MyLabel";
import ErrorMessage from "@/components/Texts/ErrorMessage";
const { TreeNode } = Tree;
const { Search } = Input;
export const MultiTreeSelect = memo(
    ({
        watch,
        treeData,
        onSelectVal,
        height = 200,
        placeholder,
        label,
        isLoading,
        errors,
        name,
        required,
        checkable = true,
        disabled,
    }) => {
        const [expandedKeys, setExpandedKeys] = useState(null);
        const [autoExpandParent, setAutoExpandParent] = useState(true);
        const [data, setData] = useState(treeData);
        const [search, setSearch] = useState("");
        const treeView = useRef()
        //function area

        const onExpand = (expandedKeys) => {
            setExpandedKeys(expandedKeys);
            setAutoExpandParent(false);
        };
        const onCheck = (value, va) => {
            try {
                if (search && va.checked) {
                    let data = [...new Set([...(!watch()[name] ? [] : watch()[name]), ...value.filter((val) => val.toString().match(/^[0-9]/))])]
                    onSelectVal(data)
                }
                else if (search && !va.checked) {
                    let data = watch()[name].filter((ele) => ele !== va.node.key)
                    onSelectVal(data.filter((val) => val.toString().match(/^[0-9]/)))
                } else {
                    onSelectVal(value.filter((val) => val.toString().match(/^[0-9]/)))
                }
            } catch (error) {
                console.log(error.message)
            }
        };
        const onSelect = (selectedKeys) => {
            onSelectVal(selectedKeys);
        };

        const renderTreeNodes = (data) =>
            data?.map((item) => {
                if (item.children) {
                    return (
                        <TreeNode title={item.title} key={item.key} dataRef={item}>
                            {renderTreeNodes(item.children)}
                        </TreeNode>
                    );
                }
                return <TreeNode {...item} />;
            });

        //create search handler
        const inputHandler = (e) => {
            setSearch(e);
        };

        //useEffect for search globaly
        useEffect(() => {
            if (search === "") {
                setData(treeData);
            } else {

                function filterTree(tree, filterKey) {
                    // Create a new array to store the filtered results
                    let filteredTree = [];
                    // Iterate over each object in the tree
                    for (let obj of tree) {
                        // Create a copy of the current object
                        let filteredObj = { ...obj };
                        // Check if the current object's key matches the filterKey
                        if (filteredObj.title.toLowerCase().includes(filterKey.toLowerCase())) {
                            // If it matches, add the entire object to the filteredTree
                            filteredTree.push(filteredObj);
                        } else {
                            // If it doesn't match, recursively filter the children array
                            if (filteredObj.children && filteredObj.children.length > 0) {
                                filteredObj.children = filterTree(filteredObj.children, filterKey);
                                // Add the object to the filteredTree if it has any matching children
                                if (filteredObj.children.length > 0) {
                                    filteredTree.push(filteredObj);
                                }
                            }
                        }
                    }
                    // Return the filtered tree
                    return filteredTree;
                }

                setData(filterTree(treeData, search))
            }
        }, [search, treeData]);
        

        return (
            <>
                <MyLabel label={label} required={required} />
                <Search
                    className="  bg-white  "
                    loading={isLoading}
                    placeholder={placeholder || "input search text"}
                    onSearch={inputHandler}
                    allowClear
                    onChange={(e) => {
                        if (!e.target.value) {
                            setSearch("")
                        }
                    }}
                    style={{
                        width: "100%",
                    }}
                />

                <div className="border p-1 pt-0 mt-1 relative">
                    {data?.[0]?.children?.length === 0 ? (
                        <>
                            <div className="text-center">
                                <span className="text-danger ">No reuslt found!</span>
                            </div>
                        </>
                    ) : (
                        <div className="treeSelect  tracking-overflow overflow-auto" style={{ maxHeight: height }}>
                            <Tree
                                disabled={disabled}
                                checkable={checkable}
                                onExpand={onExpand}
                                ref={treeView}
                                expandedKeys={expandedKeys || ["Select All"]}
                                autoExpandParent={autoExpandParent}
                                onCheck={onCheck}
                                checkedKeys={watch()[name] || []}
                                onSelect={onSelect}
                                selectedKeys={watch()[name] || []}
                            >
                                {renderTreeNodes(data || [{ title: "", children: "" }])}
                            </Tree>
                        </div>
                    )}
                </div>
                {errors[name] && <ErrorMessage>{errors[name].message}</ErrorMessage>}
            </>
        );
    }
);
