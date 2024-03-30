export const UPDATE_WEBSITE_DATA_INFO = "UPDATE_WEBSITE_DATA_INFO"
export const UPDATE_WEBSITE_MODAL = "UPDATE_WEBSITE_MODAL"



const initialState = {
    websiteDataInfo: null,
    websiteModal: false
}

export const websiteReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_WEBSITE_DATA_INFO:
            return {
                ...state, websiteDataInfo: action.payload,
            }
        case UPDATE_WEBSITE_MODAL:
            return {
                ...state, websiteModal: action.payload,
            }
        default:
            return state
    }
}
