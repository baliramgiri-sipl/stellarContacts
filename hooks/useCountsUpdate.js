import { UPDATE_CONTACT_COUNTS, UPDATE_INBOX_DATA } from '@/redux/contactReducer/contactReducer'
import { useDispatch, useSelector } from 'react-redux'

export const useCountsUpdate = () => {
    const dispatch = useDispatch()
    const { contactCounts, inboxData } = useSelector(state => state?.contactReducer)

    const onCountsUpdated = async (title, recordid) => {
        let newData = { ...contactCounts }
        let newInboxData = [...inboxData]
        switch (title) {
            case "Add To Inbox":
                newData["inbox"] = contactCounts?.inbox + 1
                break
            case "Move To Trash":
                newData["trashed"] = contactCounts?.trashed + 1
                newData["inbox"] = contactCounts?.inbox - 1
                //data
                if (recordid) {
                    newInboxData = inboxData?.filter(({ id }) => recordid !== id)
                }
                break
            case "Add To Archive":
                newData["isArchive"] = contactCounts?.isArchive + 1
                newData["inbox"] = contactCounts?.inbox - 1
                //data
                if (recordid) {
                    newInboxData = inboxData?.filter(({ id }) => recordid !== id)
                }
                break
            case "Add To Junk":
                newData["isJunk"] = contactCounts?.isJunk + 1
                newData["inbox"] = contactCounts?.inbox - 1
                //data
                if (recordid) {
                    newInboxData = inboxData?.filter(({ id }) => recordid !== id)
                }
                break
            default: break
        }
        dispatch({ type: UPDATE_CONTACT_COUNTS, payload: newData })
        dispatch({ type: UPDATE_INBOX_DATA, payload: newInboxData })
    }
    return { onCountsUpdated }
}

