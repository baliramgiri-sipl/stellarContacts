"use client"

import RotateLoader from '@/components/LoadingSpinner/RotateLoader'
import { statusHandler } from '@/lib/helpers'
import { Switch } from "@/components/ui/switch"
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { activeWebsite } from '../services'

const ActiveHandler = ({ id, defaultChecked, refetch }) => {
    const { mutate, isLoading } = useMutation(activeWebsite, {
        ...statusHandler(), onSettled() {
            refetch && refetch()
        }
    })

    if (isLoading) return <RotateLoader width={20} />
    return (
        <Switch defaultChecked={defaultChecked} onCheckedChange={(value) => { mutate({ id, is_active: value }) }} />
    )
}

export default ActiveHandler