export const UPDATE_INBOX_DATA = "UPDATE_INBOX_DATA"
export const UPDATE_IS_CONTACT_ALL = "UPDATE_IS_CONTACT_ALL"
export const UPDATE_CONTACT_CONTENT = "UPDATE_CONTACT_CONTENT"
export const UPDATE_CONTACT_SELECTED_EMAIL = "UPDATE_CONTACT_SELECTED_EMAIL"
export const UPDATE_CONTACT_COUNTS = "UPDATE_CONTACT_COUNTS"
export const UPDATE_CONTACT_SEARCH_INPUT = "UPDATE_CONTACT_SEARCH_INPUT"
export const UPDATE_CONTACT_MENU_SELECTED = "UPDATE_CONTACT_MENU_SELECTED"
export const UPDATE_USER_ACCESS = "UPDATE_USER_ACCESS"


const initialState = {
    inboxData: [],
    isAll: 0,
    content: null,
    contactCounts: {},
    contactSelectedWebsite: null,
    contactMenuSelected: "Inbox",
    contactSearchInput: "",
}

export const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_INBOX_DATA:
            return {
                ...state, inboxData: action.payload,
            }
        case UPDATE_IS_CONTACT_ALL:
            return {
                ...state, isAll: action.payload,
            }
        case UPDATE_CONTACT_CONTENT:
            return {
                ...state, content: action.payload,
            }
        case UPDATE_CONTACT_COUNTS:
            return {
                ...state, contactCounts: action.payload,
            }
        case UPDATE_CONTACT_SELECTED_EMAIL:
            return {
                ...state, contactSelectedWebsite: action.payload,
            }
        case UPDATE_CONTACT_MENU_SELECTED:
            return {
                ...state, contactMenuSelected: action.payload,
            }

        default:
            return state
    }
}
