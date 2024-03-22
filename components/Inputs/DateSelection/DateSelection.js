"use client"

import React, { useMemo } from 'react'
import AppInput from '@/components/Inputs/AppInput';


const DateSelection = ({ setValue, trigger, watch, register, errors }) => {

    const inputs = useMemo(() => [
        {
            id: 1,
            name: "start_date",
            label: "Start Date",
            type: "date",
            ...(watch("end_date") ? { required: true, } : {})
        },
        {
            id: 2,
            name: "end_date",
            label: "End Date",
            type: "date",
            ...(watch("start_date") ? { required: true, } : {})
        },
    ], [watch("start_date"), watch("end_date")])

    return (
        <div className="flex items-center  flex-wrap gap-2  my-4 lg:my:my-6">
            {inputs.map(({ id, width, ...rest }) => {
                return (
                    <div key={id} className={`w-full lg:w-[20%]`}>
                        <AppInput setValue={setValue} trigger={trigger} watch={watch} register={register} errors={errors} {...rest} />
                    </div>
                );
            })}
        </div>
    )
}

export default DateSelection