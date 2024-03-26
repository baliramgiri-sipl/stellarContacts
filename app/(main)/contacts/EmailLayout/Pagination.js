
import useContact from '@/hooks/useContact'
import { getSelectedTitle } from '@/lib/helpers'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'

const Pagination = () => {
    //contactlist Load again
    const { mutateAsyncContactList } = useContact()
    const { isAll, contactSearchInput, contactPaginationData, contactSelectedWebsite, contactMenuSelected } = useSelector(state => state?.contactReducer)
    const pageHandler = async (value) => {
        let query = getSelectedTitle(contactMenuSelected, `?website=${contactSelectedWebsite}`)
        if (!isAll) {
            query += `&isRead=${isAll}`
        }
        if (contactSearchInput) {
            query += `&search=${contactSearchInput}`
        }
        let page = contactPaginationData?.page
        if ((contactPaginationData?.page < contactPaginationData?.metaData?.totalPages) && value) {
            page++
            await mutateAsyncContactList({ query, page })
        } else if ((contactPaginationData?.page > 1 && !value)) {
            page--
            await mutateAsyncContactList({ query, page })
        }


    }
    return (
        <div className='mx-2 py-2 '>
            <div className='flex flex-wrap gap-3 items-center justify-end'>
                <span className='text-xs '>Page {contactPaginationData?.page} of {contactPaginationData?.metaData?.totalPages}</span>
                <div className='flex items-center gap-2 '>
                    <div className='hover:bg-neutral-100 rounded-md cursor-pointer ' onClick={() => pageHandler(false)}><ChevronLeft size={16} /></div>
                    <div className='hover:bg-neutral-100 rounded-md cursor-pointer ' onClick={() => pageHandler(true)}><ChevronRight size={16} /></div>
                </div>
            </div>
        </div>
    )
}

export default Pagination