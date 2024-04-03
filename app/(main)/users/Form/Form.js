"use client"
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from './validation';
import AppInput from '@/components/Inputs/AppInput';
import { useMutation } from '@tanstack/react-query';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { removeEmptyValues, setValues, statusHandler } from '@/lib/helpers';
import { usersTypeList, websiteList } from '@/lib/globleService';
import { addUser, updateUser } from '../services';
import { UPDATE_USER_MODAL } from '@/redux/userReducer/usersReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';

const Form = ({ refetch, isProfile, isEdit = true, defaultData, setEdit }) => {
    const [showpass, setShowpass] = useState(false);
    const dispatch = useDispatch()
    const session = useSession()
    const { userDataInfo } = useSelector(state => state?.usersReducer)

    const { register, watch, setError, trigger, setValue, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema(isProfile)),
        mode: "onChange",
        defaultValues: {
            is_active: true
        }
    })

    //users tyype list
    const { mutateAsync: mutateAsyncUserTypeList, data: dataUsersTypeList, isLoading: isLoadingUsersTypeList } = useMutation(usersTypeList)
    const { mutateAsync: mutateAsyncWebsiteList, data: dataWebsiteList, isLoading: isLoadingWebsiteList } = useMutation(websiteList)

    //add new user or update existing user
    const { mutateAsync: mutateAsyncUser, isLoading: isLoadingUser } = useMutation((userDataInfo || defaultData) ? updateUser : addUser, { ...statusHandler() })


    const onSubmit = async (value) => {
        await removeEmptyValues(value)
        await mutateAsyncUser((userDataInfo || defaultData) ? { userId: defaultData?.id || userDataInfo?.id, value } : value).then(async (data) => {
            dispatch({ type: UPDATE_USER_MODAL, payload: false })
            //refetch the user list
            refetch && refetch()
            if (isProfile && defaultData) {
                await session.update(data)
            }
            setEdit && setEdit(false)

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
        //if it is not setting and isprofile
        ...(!isProfile ? [{
            id: 6,
            name: "password",
            label: "Password",
            type: "password",
            required: true,
            placeholder: "Password*",
            ...ShowHideComp()
        }] : []),
        {
            id: 454,
            name: "is_active",
            label: "Is Active",
            type: "checkbox",
            className: "mt-5"
        }
    ], [ShowHideComp, dataUsersTypeList, isLoadingUsersTypeList, dataWebsiteList, isLoadingWebsiteList, isProfile])

    useEffect(() => {
        mutateAsyncUserTypeList()
        mutateAsyncWebsiteList(true) //show dropdown
    }, [])

    //exist data 
    useEffect(() => {
        if (userDataInfo) {
            setValues(setValue, userDataInfo)
        }
    }, [userDataInfo])

    useEffect(() => {
        if (defaultData && isProfile) {
            setValues(setValue, { ...defaultData, ...(isEdit ? {} : { UserTypeId: defaultData?.UserType?.name, WebsiteId: defaultData?.Website?.name }) })
        }
    }, [defaultData, isProfile, isEdit])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='px-3'>
            <div className='items-center gap-3  flex flex-wrap' >
                {inputs.map(({ id, icon, ...rest }) => {
                    return <div key={id} className={`w-full lg:w-[45%] ${!isProfile ? "xl:w-[32%]" : ""} mt-2`}>  <AppInput edit={isEdit} watch={watch} trigger={trigger} register={register} setError={setError} setValue={setValue} errors={errors} {...rest} /></div>
                })}
            </div>
            {isEdit && <button disabled={isLoadingUser} className='bg-green-400 m mt-2 text-white px-5 hover:bg-main-app-secondary/80 rounded-sm text-xs p-1'>
                {isLoadingUser ? <LoadingSpinner /> : "Submit"}
            </button>}
        </form>
    )
}

export default Form