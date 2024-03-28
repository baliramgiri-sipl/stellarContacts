"use client"
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from './validation';
import AppInput from '@/components/Inputs/AppInput';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { myAxios, removeEmptyValues, statusHandler } from '@/lib/helpers';
import { usersTypeList, websiteList } from '@/lib/globleService';
import { addUser } from '../services';
import { UPDATE_USER_MODAL } from '@/redux/userReducer/usersReducer';
import { useDispatch } from 'react-redux';

const Form = ({ refetch }) => {
    const [showpass, setShowpass] = useState(false);
    const dispatch = useDispatch()
    
    const { register, watch, setError, trigger, setValue, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema),
        mode: "onChange",
        defaultValues: {
            is_active: true
        }
    })

    //users tyype list
    const { mutateAsync: mutateAsyncUserTypeList, data: dataUsersTypeList, isLoading: isLoadingUsersTypeList } = useMutation(usersTypeList)
    const { mutateAsync: mutateAsyncWebsiteList, data: dataWebsiteList, isLoading: isLoadingWebsiteList } = useMutation(websiteList)

    //add new user
    const { mutateAsync: mutateAsyncAddUser, isLoading: isLoadingAddUser } = useMutation(addUser, { ...statusHandler() })

    const onSubmit = async (value) => {
        await removeEmptyValues(value)
        await mutateAsyncAddUser(value).then(() => {
            dispatch({ type: UPDATE_USER_MODAL, payload: false })
            //refetch the user list
            refetch && refetch()
        })
    }
    const ShowHideComp = useCallback(
        function () {
            return {
                type: showpass ? "text" : "password",
                endIcon: (
                    <div
                        className="cursor-pointer px-2"
                        onClick={() =>
                            setShowpass(!showpass)
                        }
                    >
                        {showpass ? <LuEye /> : <LuEyeOff />}
                    </div>
                ),
            };
        },
        [showpass]
    );

    const inputs = useMemo(() => [
        {
            id: 1,
            name: "first_name",
            label: "First Name",
            required: true,
            placeholder: "Full Name",
        },
        {
            id: 2,
            name: "middle_name",
            label: "Middle Name",
            placeholder: "Middle Name",
        },
        {
            id: 3,
            name: "last_name",
            label: "Last Name",
            required: true,
            placeholder: "Last Name",
        },
        {
            id: 4,
            name: "mobile",
            label: "Mobile",
            placeholder: "Mobile",
            type: "number",
        },
        {
            id: 5,
            label: "Email",
            required: true,
            name: "email",
            placeholder: "Email*",
        },
        {
            id: 5454,
            label: "Website",
            required: true,
            isLoading: isLoadingWebsiteList,
            options: dataWebsiteList || [],
            type: "select",
            name: "WebsiteId",
            placeholder: "Select Website*",
        },
        {
            id: 545564544,
            label: "User Type",
            required: true,
            isLoading: isLoadingUsersTypeList,
            options: dataUsersTypeList || [],
            type: "select",
            name: "UserTypeId",
            placeholder: "Select User Type*",
        },
        {
            id: 6,
            name: "password",
            label: "Password",
            type: "password",
            required: true,
            placeholder: "Password*",
            ...ShowHideComp()
        },
        {
            id: 454,
            name: "is_active",
            label: "Is Active",
            type: "checkbox",
            className: "mt-5"
        }
    ], [ShowHideComp, dataUsersTypeList, isLoadingUsersTypeList, dataWebsiteList, isLoadingWebsiteList])

    useEffect(() => {
        mutateAsyncUserTypeList()
        mutateAsyncWebsiteList()
    }, [])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='px-3'>
            <div className='items-center gap-3  flex flex-wrap' >
                {inputs.map(({ id, icon, ...rest }) => {
                    return <div key={id} className='w-full lg:w-[45%] xl:w-[32%] mt-2'>  <AppInput watch={watch} trigger={trigger} register={register} setError={setError} setValue={setValue} errors={errors} {...rest} /></div>
                })}
            </div>
            <button disabled={isLoadingAddUser} className='bg-green-400 m mt-2 px-5 hover:bg-main-app-secondary/80 rounded-sm text-xs p-1'>
                {isLoadingAddUser ? <LoadingSpinner /> : "Submit"}
            </button>
        </form>
    )
}

export default Form