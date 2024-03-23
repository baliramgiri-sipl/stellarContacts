import dynamic from 'next/dynamic'
const InfiniteLoader = dynamic(() => import("@/components/LoadingSpinner/InfiniteLoader"), { ssr: false })
import React from 'react'

const UsersLoading = () => {
    return (
        <section className='w-full h-screen flex justify-center items-center'>
            <InfiniteLoader />
        </section>
    )
}

export default UsersLoading