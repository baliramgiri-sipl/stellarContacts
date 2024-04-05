"use client"
import React, { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import { ContactEmailSchema } from './validation';
import AppInput from '@/components/Inputs/AppInput';
import { useMutation } from '@tanstack/react-query';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { removeEmptyValues, setValues, statusHandler } from '@/lib/helpers';
import { addNewContctEmail, updateContctEmail } from '../services';
import { websiteList } from '@/lib/globleService';

const Form = ({ refetch, data, setOpenForm }) => {

    const { register, watch, setError, trigger, setValue, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(ContactEmailSchema),
        mode: "onChange",
        defaultValues: {
            is_active: true
        }
    })
    const { mutateAsync: mutateAsyncWebsiteList, data: dataWebsiteList, isLoading: isLoadingWebsiteList } = useMutation(websiteList)

    //add new ContactEmail or update existing ContactEmail
    const { mutateAsync: mutateAsyncContactEmail, isLoading: isLoadingContactEmail } = useMutation(data ? updateContctEmail : addNewContctEmail, { ...statusHandler() })

    async function updateHandler({ }) {
        await mutateAsyncUpdate()
    }
    const onSubmit = async (value) => {
        await removeEmptyValues(value)
        await mutateAsyncContactEmail(data ? { contactEmailId: data?.id, value } : value).then(() => {
            //refetch the ContactEmail list
            refetch && refetch()
            setOpenForm(false)
        })
    }


    const inputs = useMemo(() => [
        {
            id: 1,
            name: "WebsiteId",
            label: "Website Name",
            required: true,
            isLoading: isLoadingWebsiteList,
            options: dataWebsiteList || [],
            type: "select",
            placeholder: "Select a website",
        },
        {
            id: 2,
            name: "email",
            label: "Email",
            required: true,
            placeholder: "Email",
        },
        {
            id: 4,
            name: "smtp_host",
            label: "SMTP Host",
            required: true,
            placeholder: "SMTP Host"
        },
        {
            id: 5,
            label: "SMTP Port",
            required: true,
            name: "smtp_port",
            placeholder: "SMTP Port",
        },
        {
            id: 45451,
            name: "smtp_service",
            label: "SMTP Service",
            required: true,
            options: [{ id: "gmail", name: "gmail" }],
            type: "select",
            placeholder: "Select a Service",
        },
        {
            id: 5,
            label: "SMTP Password",
            required: true,
            name: "smtp_password",
            placeholder: "SMTP Password",
        },
        {
            id: 454,
            name: "is_active",
            label: "Is Active",
            type: "checkbox",
        }
    ], [isLoadingWebsiteList, dataWebsiteList])

    //exist data 
    useEffect(() => {
        mutateAsyncWebsiteList(true)
    }, [])

    useEffect(() => {
        if (data) {
            setValues(setValue, data)
        }
    }, [data])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='px-3'>
            <div className='items-center  justify-between flex flex-wrap' >
                {inputs.map(({ id, icon, ...rest }) => {
                    return <div key={id} className='w-full lg:w-[49%] mt-2'>  <AppInput watch={watch} trigger={trigger} register={register} setError={setError} setValue={setValue} errors={errors} {...rest} /></div>
                })}
            </div>
            <button disabled={isLoadingContactEmail} className='bg-green-400 text-white mt-2 px-5 hover:bg-main-app-secondary/80 rounded-sm text-xs p-1'>
                {isLoadingContactEmail ? <LoadingSpinner /> : "Submit"}
            </button>
            <button type='button' disabled={isLoadingContactEmail} onClick={() => setOpenForm(false)} className='border-neutral-400 border ms-2 mt-2 px-5 hover:bg-main-app-secondary/80 rounded-sm text-xs p-1'>
                Cancel
            </button>
        </form>
    )
}

export default Form