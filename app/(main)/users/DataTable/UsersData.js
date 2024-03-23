"use client"
import { AgGridReact } from 'ag-grid-react'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import "ag-grid-enterprise"
import { defualtAgGridProps, defualtCols } from '@/lib/utils'
import InputSearchGloble from '@/components/SearchInput/InputSearchGloble'
import ActionBtn from '@/components/Actions/ActionBtn'
import { useMutation } from '@tanstack/react-query'
import { usersList } from '../services'
import { ModalBox } from '@/components/ModalBox/ModalBox'
import { CirclePlus, Plus, PlusIcon, SquarePlus } from 'lucide-react'
import Toolbar from '@/components/Toobar/Toolbar'
import Form from '../Form/Form'
export const metadata = {
    title: 'Users',
    description: 'Generated by create next app',
}
const UsersData = () => {

    //table api
    const gridRef = useRef(null);

    const { data, isLoading, mutate } = useMutation(usersList)

    const actionHandler = useCallback((productId) => {

        // dispatch({ type: UPDATE_PRODUCT_DATA, payload: { productId } })
        //redirect to edit page
        // replace("/settings/products/edit")
    }, [])

    const columnDefs = useMemo(
        () => [
            {
                field: "first_name",
                headerName: "Name",
                flex: 1,
                cellRenderer({ value, data: { middle_name, last_name } }) {
                    return `${value} ${middle_name || ""} ${last_name}`
                }
            },
            {
                field: "email",
                headerName: "Email",
            },
            {
                field: "UserType.name",
                headerName: "Role",
            },
            {
                field: "createdAt",
                headerName: "Created At",
            },
            {
                field: "actions",
                headerName: "Actions",
                cellRenderer({ value, data: { id } }) {
                    return <ActionBtn onClick={() => actionHandler(id)} />
                },
            },
        ],
        [actionHandler]
    );


    const defaultColDef = useMemo(() => {
        return defualtCols()
    }, []);


    useEffect(() => {
        try {
            if (gridRef && isLoading) {
                gridRef?.current?.api?.showLoadingOverlay();
            } else {
                gridRef?.current?.api?.hideOverlay();
            }
        } catch (error) {
            console.log(error)
        }
    }, [isLoading])


    useEffect(() => {
        mutate()
    }, [])


    return (
        <div>
            <Toolbar modalChildren={<Form />} />
            <div
                className="ag-theme-alpine w-full shadow-sm" // applying the grid theme
                style={{ height: data?.length > 10 ? 400 : 200, width: "100%" }}  // the grid will fill the size of the parent container
            >
                <AgGridReact
                    {...defualtAgGridProps({
                        data: data || [],
                        defaultColDef,
                    })}
                    ref={gridRef}
                    columnDefs={columnDefs}

                />
            </div>
        </div>
    )
}

export default UsersData