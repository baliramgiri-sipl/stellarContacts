import useContact from '@/hooks/useContact'
import { UPDATE_CONTACT_SEARCH_INPUT } from '@/redux/contactReducer/contactReducer'
import { Search } from 'lucide-react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const SearchInput = () => {
    const dispatch = useDispatch()
    const { contactSearchInput, isAll, contactSelectedWebsite, contactMenuSelected } = useSelector(state => state?.contactReducer)
    const { mutateAsyncContactList } = useContact()
    // useEffect()
    async function searchHandler({ target: { value } }) {
        dispatch({ type: UPDATE_CONTACT_SEARCH_INPUT, payload: value })
        if (!value) {
            let query = `?website=${contactSelectedWebsite}`
            if (!isAll) {
                query += `&isRead=${false}`
            }
            if (contactMenuSelected === "Trash") {
                query += `&isSoftDeleted=true`
            }
            if (contactMenuSelected === "Sent") {
                query += `&isSent=true`
            }
            await mutateAsyncContactList({ query, page: 1 })
        }
    }

    useEffect(() => {
        if (contactSearchInput) {
            const searchData = setTimeout(async () => {
                let query = `?website=${contactSelectedWebsite}`
                if (contactSearchInput) {
                    query += `&search=${contactSearchInput}`
                }
                if (!isAll) {
                    query += `&isRead=${false}`
                }
                if (contactMenuSelected) {
                    switch (contactMenuSelected) {
                        case "Junk":
                            query += `&isJunk=true`
                            break
                        case "Trash":
                            query += `&isSoftDeleted=true`
                            break
                        case "Archive":
                            query += `&isArchive=true`
                            break
                        case "Sent":
                            query += `&isSent=true`
                            break
                        default:
                            break
                    }
                }
                await mutateAsyncContactList({ query, page: 1 })
            }, 700);
            return () => clearTimeout(searchData)
        }
    }, [contactSearchInput])

    return (
        <div className="border mt-3 mx-2 px-2 py-1 rounded-md border-green-200 flex gap-2 items-center">
            <Search size={16} className="text-green-500" />
            <input
                value={contactSearchInput || ""}
                onChange={searchHandler}
                type="text"
                placeholder="Search"
                className="placeholder:font-normal border-none outline-none flex-1 py-1 text-[13px]"
            />
        </div>
    )
}

export default SearchInput