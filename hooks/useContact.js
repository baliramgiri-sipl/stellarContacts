import { contactList } from '@/app/(main)/contacts/services'
import { UPDATE_CONTACT_SCROLL_VIEW_DATA, UPDATE_INBOX_DATA } from '@/redux/contactReducer/contactReducer'
import { useMutation } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'

const useContact = () => {
    const { isAll, contactPaginationData } = useSelector(state => state?.contactReducer)

    const dispatch = useDispatch()
    //contactlist Load again

    const { mutateAsync, isLoading: isAllLoading } = useMutation(async (data) => {
        return await contactList({ query: `${data?.query}&page=${data?.page || contactPaginationData?.page}` })
    }, {
        onSuccess({ data, metaData }) {
            dispatch({ type: UPDATE_CONTACT_SCROLL_VIEW_DATA, payload: { ...contactPaginationData, page: metaData?.currentPage, metaData } })
            if (isAll === 0) {
                dispatch({ type: UPDATE_INBOX_DATA, payload: data?.filter(({ isRead }) => !isRead) })
            } else {
                dispatch({ type: UPDATE_INBOX_DATA, payload: data })
            }
        }
    })

    return { mutateAsyncContactList: mutateAsync, isAllLoading }
}

export default useContact