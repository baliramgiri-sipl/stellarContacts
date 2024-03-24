import { contactList } from '@/app/(main)/contacts/services'
import { UPDATE_INBOX_DATA } from '@/redux/contactReducer/contactReducer'
import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'

const useContact = () => {
    const dispatch = useDispatch()
    //contactlist Load again
    const { mutateAsync, isLoading: isAllLoading } = useMutation(contactList, {
        onSuccess(newData) {
            dispatch({ type: UPDATE_INBOX_DATA, payload: newData })
        }
    })
    return { mutateAsyncContactList: mutateAsync, isAllLoading }
}

export default useContact