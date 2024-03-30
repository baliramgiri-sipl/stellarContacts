"use client"
import React, { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import { websiteSchema } from './validation';
import AppInput from '@/components/Inputs/AppInput';
import { useMutation } from '@tanstack/react-query';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { removeEmptyValues, setValues, statusHandler } from '@/lib/helpers';
import { addUser, addWebsite, updateUser, updateWebsite } from '../services';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_WEBSITE_MODAL } from '@/redux/websiteReducer/websiteReducer';

const Form = ({ refetch }) => {
    const dispatch = useDispatch()
    const { websiteDataInfo } = useSelector(state => state?.websiteReducer)

    const { register, watch, setError, trigger, setValue, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(websiteSchema),
        mode: "onChange",
        defaultValues: {
            is_active: true
        }
    })

    //add new user or update existing user
    const { mutateAsync: mutateAsyncUser, isLoading: isLoadingUser } = useMutation(websiteDataInfo ? updateWebsite : addWebsite, { ...statusHandler() })


    const onSubmit = async (value) => {
        await removeEmptyValues(value)
        await mutateAsyncUser(websiteDataInfo ? { websiteId: websiteDataInfo?.id, value } : value).then(() => {
            dispatch({ type: UPDATE_WEBSITE_MODAL, payload: false })
            //refetch the user list
            refetch && refetch()
        })
    }

    const inputs = useMemo(() => [
        {
            id: 1,
            name: "name",
            label: "Name",
            required: true,
            placeholder: "Website Name",
        },
        {
            id: 454,
            name: "is_active",
            label: "Is Active",
            type: "checkbox",
            className: "mt-5"
        }
    ], [])

    //exist data 
    useEffect(() => {
        if (websiteDataInfo) {
            setValues(setValue, websiteDataInfo)
        }
    }, [websiteDataInfo])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='px-3'>
            <div className='items-center gap-3  flex flex-wrap' >
                {inputs.map(({ id, icon, ...rest }) => {
                    return <div key={id} className='w-full lg:w-[45%] xl:w-[46%] mt-2'>  <AppInput watch={watch} trigger={trigger} register={register} setError={setError} setValue={setValue} errors={errors} {...rest} /></div>
                })}
            </div>
            <button disabled={isLoadingUser} className='bg-green-400 m mt-2 px-5 hover:bg-main-app-secondary/80 rounded-sm text-xs p-1'>
                {isLoadingUser ? <LoadingSpinner /> : "Submit"}
            </button>
        </form>
    )
}

export default Form